import { mergeSort } from "./mergesort";
import { LineSegment } from "./lineSegment";
import Point from "./point";

export class FastCollinearPoints {
  private lineSegments: LineSegment[] = [];

  constructor(points: Point[]) {
    if (!points || points.some((p) => !p)) {
      throw new Error("Null argument or null point in argument");
    }

    const pointSet = new Set(points.map((p) => `${p.x},${p.y}`));
    if (pointSet.size !== points.length) {
      throw new Error("Repeated point in argument");
    }

    for (const p of points) {
      const slopesAndPoints: { slope: number; point: Point }[] = [];
      for (const q of points) {
        if (p !== q) {
          slopesAndPoints.push({ slope: p.slopeTo(q), point: q });
        }
      }

      const sortedSlopesAndPoints = mergeSort(slopesAndPoints);

      let start = 0;
      while (start < sortedSlopesAndPoints.length) {
        let currSlope = sortedSlopesAndPoints[start].slope;
        let count = 1;
        for (let j = start + 1; j < sortedSlopesAndPoints.length; j++) {
          if (sortedSlopesAndPoints[j].slope === currSlope) {
            count++;
          } else {
            break;
          }
        }

        if (count >= 3) {
          const segment = new LineSegment(
            p,
            sortedSlopesAndPoints[start].point,
          );
          for (let j = start + 1; j < start + count; j++) {
            if (sortedSlopesAndPoints[j].point.compareTo(segment.p) < 0) {
              segment.p = sortedSlopesAndPoints[j].point;
            } else if (
              sortedSlopesAndPoints[j].point.compareTo(segment.q) > 0
            ) {
              segment.q = sortedSlopesAndPoints[j].point;
            }
          }
          this.lineSegments.push(segment);
        }

        start += count;
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
