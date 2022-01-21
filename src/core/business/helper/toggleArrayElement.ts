export function toggleElement<T>(array: T[], element: T, shouldBeContained: boolean): T[] {
  const isContained = array.find(searchElement => searchElement === element) !== undefined;
  if (shouldBeContained && !isContained) {
    // color is not in array, but should
    return [...array, element];
  } else if (!shouldBeContained && isContained) {
    // color is in array, but shouldn't
    return [...array].filter(searchElement => searchElement !== element);
  }
  return array;
}
