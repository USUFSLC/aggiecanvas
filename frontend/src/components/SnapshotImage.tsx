import { MutableRefObject, useEffect } from "react";

export interface SnapshotImageProps {
  snapshot?: Uint8Array;
  rows: number;
  columns: number;
  draggable?: boolean;
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
}

export const SnapshotImage = ({
  snapshot,
  rows,
  columns,
  draggable,
  canvasRef,
}: SnapshotImageProps) => {
  const refresh = async () => {
    if (!snapshot || rows <= 0 || columns <= 0 || !canvasRef?.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const imageData = ctx.createImageData(columns, rows);

    for (let i = 0; i < snapshot.length; i++) {
      const pixelIndex = (i * 4) / 3;

      imageData.data[pixelIndex] = snapshot[i]; // R value
      imageData.data[pixelIndex + 1] = snapshot[i + 1];
      imageData.data[pixelIndex + 2] = snapshot[i + 2];
      imageData.data[pixelIndex + 3] = 255; // (fully opaque)
    }

    ctx.putImageData(imageData, 0, 0);
  };

  useEffect(() => {
    refresh();
  }, [snapshot, rows, columns, canvasRef]);

  return (
    <canvas
      className={draggable ? "drag-canvas" : "grid-thumbnail"}
      ref={canvasRef}
      width={columns}
      height={rows}
    />
  );
};
