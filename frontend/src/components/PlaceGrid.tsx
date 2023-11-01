import { useRef, useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ColorSelector } from "./ColorSelector";
import { SnapshotImage } from "./SnapshotImage";
import { useAggieCanvasClient } from "@/context/AggieCanvasClient";
import { useAuthContext } from "@/context/AuthContext";
import { AVAILABLE_COLORS } from "./colors";

export interface SnapshotImageProps {
  updateGrid: () => void;
  gridId: number;
  snapshot?: Uint8Array;
  rows: number;
  columns: number;
}

interface Point {
  x: number;
  y: number;
}

export const PlaceGrid = ({
  updateGrid,
  gridId,
  snapshot,
  rows,
  columns,
}: SnapshotImageProps) => {
  const canvasRef = useRef(null);
  const transformWrapper = useRef(null);

  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [selectedPixel, setSelectedPixel] = useState<Point | undefined>();
  const [currentColor, setCurrentColor] = useState<string>(AVAILABLE_COLORS[0]);

  const { client } = useAggieCanvasClient();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!transformWrapper.current || !selectedPixel) return;

    setTimeout(() => {
      const targetScale =
        Math.max(
          canvasRef.current.clientWidth,
          canvasRef.current.clientHeight
        ) / 80;

      const dx = -canvasRef.current.clientWidth / columns;
      const dy = -canvasRef.current.clientHeight / rows;

      transformWrapper.current.setTransform(
        dx * selectedPixel.x * targetScale - (dx * columns) / 2,
        dy * selectedPixel.y * targetScale - (dy * rows) / 2,
        targetScale,
        200
      );
    });
  }, [selectedPixel, rows, columns, canvasRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !selectedPixel) return;
    const ctx = canvas.getContext("2d");

    const currentPixel = ctx.getImageData(
      selectedPixel.x,
      selectedPixel.y,
      1,
      1
    );

    const blinkingPixel = ctx.createImageData(1, 1);
    for (let i = 0; i < 4; i++) blinkingPixel.data[i] = currentPixel.data[i];

    let goingUp = blinkingPixel.data[3] < Math.pow(2, 8) - 1;

    const blink = (delta = 4) => {
      const opacity = blinkingPixel.data[3];

      if (goingUp) {
        const newOpacity = opacity + delta;
        if (newOpacity > Math.pow(2, 8) - 1) goingUp = false;

        for (let i = 0; i < 4; i++)
          blinkingPixel.data[i] = Math.min(255, newOpacity);
      } else {
        const newOpacity = opacity - delta;
        if (newOpacity < 100) goingUp = true;

        for (let i = 0; i < 4; i++)
          blinkingPixel.data[i] = Math.max(0, newOpacity);
      }

      ctx.putImageData(blinkingPixel, selectedPixel.x, selectedPixel.y);
    };

    const blinkInterval = setInterval(blink, 20);
    return () => {
      clearInterval(blinkInterval);
      ctx.putImageData(currentPixel, selectedPixel.x, selectedPixel.y);
    };
  }, [snapshot, selectedPixel]);

  const pushPixel = () => {
    if (selectedPixel)
      client
        .postGridByIdPixel(gridId, {
          row: selectedPixel.y,
          column: selectedPixel.x,
          color:
            parseInt(currentColor.replaceAll("#", "").toLowerCase(), 16) >>> 0,
        })
        .then(updateGrid);
  };

  return (
    <div className="canvas-holder">
      <TransformWrapper
        ref={transformWrapper}
        velocityAnimation={{ disabled: true }}
        doubleClick={{ disabled: true }}
        alignmentAnimation={{ disabled: true }}
        onPanningStop={() => setIsDragging(false)}
      >
        <TransformComponent>
          <div
            onMouseMove={() => setIsDragging(mouseDown)}
            onMouseDown={() => setMouseDown(true)}
            onMouseUp={(e) => {
              setMouseDown(false);
              if (isDragging) {
                setIsDragging(false);
                return;
              }
              if (!canvasRef.current) return;

              const rect = canvasRef.current.getBoundingClientRect();
              const x = Math.floor(
                ((e.clientX - rect.left) / rect.width) * columns
              );
              const y = Math.floor(
                ((e.clientY - rect.top) / rect.height) * rows
              );
              if (
                selectedPixel &&
                selectedPixel.y == y &&
                selectedPixel.x == x
              ) {
                setSelectedPixel(undefined);
                return;
              }

              setSelectedPixel({ x, y });
            }}
          >
            <SnapshotImage
              snapshot={snapshot}
              rows={rows}
              columns={columns}
              draggable={true}
              canvasRef={canvasRef}
            />
          </div>
        </TransformComponent>
      </TransformWrapper>
      <div className="controls">
        <ColorSelector
          currentColor={currentColor}
          setCurrentColor={setCurrentColor}
          availableColors={AVAILABLE_COLORS}
        />
        <button
          style={{ maxWidth: "100%" }}
          type="submit"
          onClick={pushPixel}
          disabled={!user || !selectedPixel}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
