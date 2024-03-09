import Point from "./point";

export function mergeSort(points: Point[]): Point[] {
  if (points.length <= 1) return points;

  const middle = Math.floor(points.length / 2);
  const left = points.slice(0, middle);
  const right = points.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left: Point[], right: Point[]): Point[] {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex].compareTo(right[rightIndex]) < 0) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}