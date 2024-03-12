import p5 from "p5";
import Point from "./src/point";
import { BruteCollinearPoints } from "./src/bruteCollinearPoints";
import { FastCollinearPoints } from "./src/fastCollinearPoints";

const width: number = 800;
const height: number = 500;
const padding: number = 50;

let sketch = function (p: p5) {
  p.setup = function () {
    p.createCanvas(width, height);

    p.strokeWeight(3);
    p.stroke("blue");

    // x and y axes
    p.line(padding, padding, padding, height - padding);
    p.line(padding, height - padding, width - padding, height - padding);

    // y-axis arrow head
    p.line(padding, padding, padding - 5, padding + 5);
    p.line(padding, padding, padding + 5, padding + 5);

    // x-axis arrow head
    p.line(
      width - padding,
      height - padding,
      width - padding - 5,
      height - padding + 5,
    );
    p.line(
      width - padding,
      height - padding,
      width - padding - 5,
      height - padding - 5,
    );

    p.strokeWeight(0);
    p.text("(0, 0)", padding + 10, height - 30);
  };

  // Declare your point objects here~
  // const point = new Point(19000, 10000);
  // const point2 = new Point(10000, 10000);

  // from input10.txt
  const points = [
    new Point(4000, 30000, p),
    new Point(3500, 28000, p),
    new Point(3000, 26000, p),
    new Point(2000, 22000, p),
    new Point(1000, 18000, p),
    new Point(13000, 21000, p),
    new Point(23000, 16000, p),
    new Point(28000, 13500, p),
    new Point(28000, 5000, p),
    new Point(28000, 1000, p),
  ];
  p.draw = function () {
    p.translate(padding, height - padding);
    p.scale(1 / 100, -1 / 100);

    // Call your draw and drawTo here.

    // point.draw();
    // point2.draw();
    // point.drawTo(point2);

    for (const point of points) {
      point.draw();
    }

    const bruteCollinear = new BruteCollinearPoints(points);
    for (const segment of bruteCollinear.segments()) {
      console.log(segment.toString());
      segment.draw();
    }

    const collinear = new FastCollinearPoints(points);
    for (const segment of collinear.segments()) {
      console.log(segment.toString());
      segment.draw();
    }
  };
};

new p5(sketch);
