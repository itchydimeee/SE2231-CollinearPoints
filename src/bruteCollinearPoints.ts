import { LineSegment } from "./lineSegment";
import Point from "./point";

export class BruteCollinearPoints {
  private lineSegments: LineSegment[] = [];

  constructor(points: Point[]) {
    if (!points || points.some((p) => !p)) {
      throw new Error("You can have a null point");
    }

    const set = new Set(points.map((p) => `${p.x},${p.y}`));
    if (set.size !== points.length) {
      throw new Error("Encountered a repeated point in argument");
    }

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        for (let k = j + 1; k < points.length; k++) {
          for (let l = k + 1; l < points.length; l++) {
            const p = points[i];
            const q = points[j];
            const r = points[k];
            const s = points[l];

            if (q.slopeTo(r) === p.slopeTo(q)) {
              if (q.slopeTo(r) === r.slopeTo(s)) {
                this.lineSegments.push(new LineSegment(p, s));
              }
            }
          }
        }
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
