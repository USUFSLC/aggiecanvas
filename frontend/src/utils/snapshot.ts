export const decodeSnapshot = (
  bytes: Uint8Array,
  rows: number,
  cols: number
): number[][] => {
  const result: number[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(0)
  );
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const index = (row * cols + col) * 3;

      const red = bytes[index];
      const green = bytes[index + 1];
      const blue = bytes[index + 2];

      const color = (red << 16) | (green << 8) | blue;

      result[row][col] = color;
    }
  }

  return result;
};

export const encodeSnapshot = (colors: number[][]): Uint8Array => {
  const colorArray = [];
  for (const row of colors) {
    for (const color of row) {
      const r = color >> 16;
      const g = (color >> 8) & 0xff;
      const b = color & 0xff;

      colorArray.push(r);
      colorArray.push(g);
      colorArray.push(b);
    }
  }
  return Uint8Array.from(colorArray);
};

export const applyUpdatesToSnapshot = (
  bytes: Uint8Array,
  snapshotRows: number,
  snapshotCols: number,
  updates: { row: number; column: number; color: number }[],
  newRows: number,
  newCols: number
) => {
  const oldColors = decodeSnapshot(bytes, snapshotRows, snapshotCols);

  const newColors = Array(newRows)
    .fill(0)
    .map((_, row) =>
      Array(newCols)
        .fill(0)
        .map((_, col) =>
          row < snapshotRows && col < snapshotCols ? oldColors[row][col] : 0
        )
    );

  for (const { row, column, color } of updates) {
    newColors[row][column] = color;
  }

  return encodeSnapshot(newColors);
};
