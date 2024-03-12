export default class Point {
  x: number;
  y: number;
  p: any;

  constructor(x: number, y: number, p: any) {
    this.x = x;
    this.y = y;
    this.p = p;
  }

  draw(): void {
    this.p.stroke("black");
    this.p.strokeWeight(800);
    this.p.point(this.x, this.y);
  }

  drawTo(that: Point): void {
    this.p.stroke("black");
    this.p.strokeWeight(200);
    this.p.line(this.x, this.y, that.x, that.y);
  }

  slopeTo(that: Point): number {
    const dx = that.x - this.x;
    const dy = that.y - this.y;

    if (dx === 0 && dy === 0) {
      return -Infinity;
    } else if (dx === 0) {
      return Infinity;
    } else if (dy === 0) {
      return 0;
    } else {
      return dy / dx;
    }
  }

  compareTo(z: Point): number {
    if (this.x === z.x && this.y === z.y) {
      return 0;
    } else if (this.x < z.x || (this.x === z.x && this.y < z.y)) {
      return -1;
    } else {
      return 1;
    }
  }
}
