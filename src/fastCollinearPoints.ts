import Point from "./point";
import { LineSegment } from "./lineSegment";
import { mergeSort } from "./mergesort";


export default class FastCollinearPoints {
  private lineSegments: LineSegment[];


  constructor(points: Point[]) {
    this.lineSegments = [];
    this.findCollinearPoints(points);
  }


  private findCollinearPoints(points: Point[]) {
    const n = points.length;


    for (let i = 0; i < n; i++) {
      const origin = points[i];
      const sortedPoints = [...points];
      sortedPoints.splice(i, 1); // Remove the origin point
      sortedPoints.sort((p1, p2) => origin.slopeTo(p1) - origin.slopeTo(p2));


      let start = 0;
      while (start < sortedPoints.length) {
        let end = start + 1;
        while (
          end < sortedPoints.length &&
          origin.slopeTo(sortedPoints[start]) === origin.slopeTo(sortedPoints[end])
        ) {
          end++;
        }


        if (end - start >= 3) {
          const collinearPoints = [origin, ...sortedPoints.slice(start, end)];
          const sortedCollinearPoints = mergeSort(collinearPoints);
          const lineSegment = new LineSegment(sortedCollinearPoints[0], sortedCollinearPoints[sortedCollinearPoints.length - 1]);
          this.lineSegments.push(lineSegment);
        }


        start = end;
      }
    }
  }


  numberOfSegments(): number {
    return this.lineSegments.length;
  }


  segments(): LineSegment[] {
    return this.lineSegments;
  }
}
