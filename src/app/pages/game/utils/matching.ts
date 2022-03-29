export function matching(arr1: number[], arr2: number[]) {
  return arr1.filter(el => arr2.includes(el)).length;
}
