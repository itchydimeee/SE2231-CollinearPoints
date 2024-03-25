import Point from "./point";

declare const p5: any; // This line assumes that p5 is available globally

export class LineSegment {
  p: Point;
  q: Point;

  constructor(p: Point, q: Point) {
    // DO NOT MODIFY
    this.p = p;
    this.q = q;
  }

  draw(): void {
    // DO NOT MODIFY
    p5.stroke("black");
    p5.strokeWeight(2);
    p5.line(this.p.x, this.p.y, this.q.x, this.q.y);
  }

  toString(): string {
    // DO NOT MODIFY
    return `${this.p} -> ${this.q}`;
  }
}