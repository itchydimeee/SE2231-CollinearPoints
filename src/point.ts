export default class Point {
  x: number
  y: number
  p: any

  constructor (x: number, y: number, p: any) {
    this.x = x
    this.y = y
    this.p = p
  }

  draw (): void {
    this.p.stroke('black')
    this.p.strokeWeight(800)
    this.p.point(this.x, this.y)
  }

  drawTo (that: Point): void {
    this.p.stroke('black')
    this.p.strokeWeight(200)
    this.p.line(this.x, this.y, that.x, that.y)
  }

  slopeTo (that: Point): number {}
}
