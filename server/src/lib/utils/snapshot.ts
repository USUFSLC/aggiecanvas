export const decodeSnapshot = (
  bytes: Uint8Array,
  rows: number,
  cols: number
): number[][] => {
  const colors = Array(rows)
    .fill(0)
    .map(() => Array(cols).fill(0));

  for (let rgb_i = 0; rgb_i < Math.floor(bytes.length / 3); rgb_i++) {
    const r_i = rgb_i * 3;

    const row = Math.floor(rgb_i / cols);
    const col = rgb_i % rows;
    colors[row][col] =
      (bytes[r_i] << 24) + (bytes[r_i + 1] << 16) + (bytes[r_i + 2] << 8);
  }
  return colors;
};

export const encodeSnapshot = (colors: number[][]): Uint8Array => {
  const colorArray = [];
  for (const row of colors) {
    for (const color of row) {
      const r = color >> 24;
      const g = (color >> 16) & 0xff;
      const b = (color >> 8) & 0xff;

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
