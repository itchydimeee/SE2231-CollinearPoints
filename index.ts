
import p5 from "p5";

const width: number = 800
const height: number = 500
const padding: number = 50


let sketch = function (p: p5) {
 
  p.setup = function () {
    p.createCanvas(width, height)


    p.strokeWeight(7)
    p.stroke('blue')


    // x and y axes
    p.line(padding, padding, padding, height - padding)
    p.line(padding, height - padding, width - padding, height - padding)


    // y-axis arrow head
    p.line(padding, padding, padding - 5, padding + 5)
    p.line(padding, padding, padding + 5, padding + 5)


    // x-axis arrow head
    p.line(
      width - padding,
      height - padding,
      width - padding - 5,
      height - padding + 5
    )
    p.line(
      width - padding,
      height - padding,
      width - padding - 5,
      height - padding - 5
    )


    p.strokeWeight(0)
    p.text('(0, 0)', padding + 10, height - 30)

    p.strokeWeight(0);
    p.text("(0, 0)", padding + 10, height - 30);
    p.noLoop();
  }


  class Point {
    x: number;
    y: number;
    p: any;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }

    draw(): void {
      // DO NOT MODIFY

      p.stroke("black");
      p.strokeWeight(800);
      p.point(this.x, this.y);
    }

    drawTo(that: Point) {
      // DO NOT MODIFY

      p.stroke("black");
      p.strokeWeight(200);
      p.line(this.x, this.y, that.x, that.y);
    }

    slopeTo(that: Point): number {
      if (this.x === that.x) {
        if (this.y === that.y) {
          return Number.NEGATIVE_INFINITY;
        }
        return Number.POSITIVE_INFINITY;
      }
      if (this.y === that.y) {
        return 0;
      }

      return (that.y - this.y) / (that.x - this.x);
    }

    compareTo(that: Point): number {
      if (this.x < that.x) {
        return -1;
      } else if (this.x > that.x) {
        return +1;
      } else if (this.y < that.y) {
        return -1;
      } else if (this.y > that.y) {
        return +1;
      }

      return 0;
    }
  }

  class LineSegment {
    p: Point;
    q: Point;

    constructor(p: Point, q: Point) {
      // DO NOT MODIFY

      this.p = p;
      this.q = q;
    }

    draw(): void {
      // DO NOT MODIFY

      p.stroke("black");
      p.strokeWeight(200);
      p.line(this.p.x, this.p.y, this.q.x, this.q.y);
    }

    toString(): string {
      // DO NOT MODIFY

      return `[${this.p.x}, ${this.p.y}] -> [${this.q.x}, ${this.q.y}]`;
    }
  }

  class BruteCollinearPoints {
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
                const collinearPoints = [p1, p2, p3, p4];
                const sortedCollinearPoints = collinearPoints.sort((a, b) =>
                  a.compareTo(b),
                );
                const lineSegment = new LineSegment(
                  sortedCollinearPoints[0],
                  sortedCollinearPoints[sortedCollinearPoints.length - 1],
                );
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
  interface SlopeAndPoint {
    slope: number;
    point: Point;
  }

  function mergeSort(arr: SlopeAndPoint[]): SlopeAndPoint[] {
    if (arr.length <= 1) return arr;

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
  }

  function merge(
    left: SlopeAndPoint[],
    right: SlopeAndPoint[],
  ): SlopeAndPoint[] {
    let result: SlopeAndPoint[] = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex].slope < right[rightIndex].slope) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
  }

  class FastCollinearPoints {
    private lineSegments: LineSegment[];

    constructor(points: Point[]) {
      this.lineSegments = [];
      this.findCollinearPoints(points);
    }

    private findCollinearPoints(points: Point[]) {
      const n = points.length;

      for (let i = 0; i < n; i++) {
        const origin = points[i];
        const slopeAndPoints: SlopeAndPoint[] = [];

        for (let j = 0; j < n; j++) {
          if (i !== j) {
            const point = points[j];
            slopeAndPoints.push({
              slope: origin.slopeTo(point),
              point: point,
            });
          }
        }

        const sortedPoints = mergeSort(slopeAndPoints);

        let start = 0;
        while (start < sortedPoints.length) {
          let end = start + 1;
          while (
            end < sortedPoints.length &&
            sortedPoints[start].slope === sortedPoints[end].slope
          ) {
            end++;
          }

          if (end - start >= 2) {
            const collinearPoints = [
              origin,
              ...sortedPoints.slice(start, end).map((sp) => sp.point),
            ];
            const sortedCollinearPoints = collinearPoints.sort((a, b) =>
              a.compareTo(b),
            );
            const lineSegment = new LineSegment(
              sortedCollinearPoints[0],
              sortedCollinearPoints[sortedCollinearPoints.length - 1],
            );
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

  // Declare your point objects here~
  // const point = new Point(19000, 10000);
  // const point2 = new Point(10000, 10000);

  // from input6.txt
  const points: Point[] = [
    new Point(19000, 10000),
    new Point(18000, 10000),
    new Point(32000, 10000),
    new Point(21000, 10000),
    new Point(1234, 5678),
    new Point(14000, 10000),
  ];

  p.draw = function () {
    p.translate(padding, height - padding)
    p.scale(1 / 100, -1 / 100)


    // Call your draw and drawTo here.


    // point.draw();
    // point2.draw();
    // point.drawTo(point2);


    for (const point of points) {
      point.draw()
    }

    const collinear = new FastCollinearPoints(points);
    for (const segment of collinear.segments()) {
      console.log(segment.toString());
      segment.draw();
    }
  };

  //   p.draw = function () {
  //     p.translate(padding, height - padding);
  //     p.scale(1 / 100, -1 / 100);

  //     for (const point of points) {
  //       point.draw();
  //     }

  //     const bruteCollinear = new BruteCollinearPoints(points);
  //     for (const segment of bruteCollinear.segments()) {
  //       console.log(segment.toString());
  //       segment.draw();
  //     }
  //   };
};

new p5(sketch)
