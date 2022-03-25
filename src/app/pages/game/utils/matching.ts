export function matching(arr1: number[], arr2: number[]) {
  return arr2.reduce(function (p, c) {
    if (arr1.indexOf(c) > -1) p++;
    return p;
  }, 0);
}
