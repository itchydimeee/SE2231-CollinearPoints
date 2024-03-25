import Point from "./point";
import { LineSegment } from "./lineSegment";
import { mergeSort } from "./mergesort";


export default class BruteCollinearPoints {
  private lineSegments: LineSegment[];


  constructor(points: Point[]) {
    this.lineSegments = [];
    this.findCollinearPoints(points);
  }


  private findCollinearPoints(points: Point[]) {
    const n = points.length;


    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        for (let k = j + 1; k < n; k++) {
          for (let l = k + 1; l < n; l++) {
            const p1 = points[i];
            const p2 = points[j];
            const p3 = points[k];
            const p4 = points[l];


            if (this.areCollinear(p1, p2, p3, p4)) {
              const collinearPoints = mergeSort([p1, p2, p3, p4]);
              const lineSegment = new LineSegment(collinearPoints[0], collinearPoints[collinearPoints.length - 1]);
              this.lineSegments.push(lineSegment);
            }
          }
        }
      }
    }
  }


  private areCollinear(p1: Point, p2: Point, p3: Point, p4: Point): boolean {
    const slope1 = p1.slopeTo(p2);
    const slope2 = p1.slopeTo(p3);
    const slope3 = p1.slopeTo(p4);


    return slope1 === slope2 && slope2 === slope3;
  }


  numberOfSegments(): number {
    return this.lineSegments.length;
  }


  segments(): LineSegment[] {
    return this.lineSegments;
  }
}
