export function CreateGridRaster(width: number, height: number, numberOfCards: number): { cols: number; rows: number } {
  const aspectRatio = width / height;
  const getCols = (rows: number) => Math.ceil(rows * aspectRatio);
  const getRows = (cols: number) => Math.ceil(cols / aspectRatio);
  let rowBase = 1;
  let colBase = 1;
  let cols = getCols(rowBase);
  let rows = getCols(colBase);

  while (true) {
    if (rowBase * cols < numberOfCards) {
      rowBase += 1;
      cols = getCols(rowBase);
    } else if (rows * colBase < numberOfCards) {
      colBase += 1;
      rows = getRows(colBase);
    } else {
      break;
    }
  }

  const ratio1 = cols / rowBase;
  const ratio2 = colBase / rows;

  if (Math.abs(ratio1 - aspectRatio) < Math.abs(ratio2 - aspectRatio)) {
    return {
      rows: rowBase,
      cols: cols
    };
  } else {
    return {
      rows: rows,
      cols: colBase
    };
  }
}
