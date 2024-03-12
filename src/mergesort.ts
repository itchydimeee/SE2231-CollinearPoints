import Point from "./point";

interface SlopeAndPoint {
  slope: number;
  point: Point;
}

export function mergeSort(arr: SlopeAndPoint[]): SlopeAndPoint[] {
  if (arr.length <= 1) return arr;

  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left: SlopeAndPoint[], right: SlopeAndPoint[]): SlopeAndPoint[] {
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
