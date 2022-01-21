export function CreateGridRaster(width: number, height: number, numberOfCards: number): { cols: number; rows: number } {
  const aspectRatio = width / height;
  const getCols = (rows: number) => Math.round(rows * aspectRatio);
  let rows = 1;
  let cols = getCols(rows);

  while (true) {
    if (rows * cols > numberOfCards) {
      break;
    }
    rows += 1;
    cols = getCols(rows);
  }

  return {
    rows,
    cols
  };
}
