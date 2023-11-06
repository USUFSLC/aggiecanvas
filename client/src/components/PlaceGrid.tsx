import { useRef, useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ColorSelector } from "./ColorSelector";
import { SnapshotImage } from "./SnapshotImage";
import { useAggieCanvasClient } from "@/context/AggieCanvasClient";
import { useAuthContext } from "@/context/AuthContext";
import { AVAILABLE_COLORS } from "./colors";
import { PixelUpdate } from "@/utils/snapshot";

export interface SnapshotImageProps {
  updateGrid: () => Promise<void>;
  gridId: number;
  snapshot?: Uint8Array;
  rows: number;
  columns: number;
  pixelUpdatesSinceLastSnapshot: PixelUpdate[];
}

interface Point {
  x: number;
  y: number;
}

const getRgb = (color: number) => [
  (color >> 16) & 0xff,
  (color >> 8) & 0xff,
  color & 0xff,
];

export const PlaceGrid = ({
  updateGrid,
  gridId,
  snapshot,
  rows,
  columns,
  pixelUpdatesSinceLastSnapshot,
}: SnapshotImageProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const transformWrapper = useRef<any>(null);

  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [hoveringPixel, setHoveringPixel] = useState<Point | undefined>();
  const [selectedPixel, setSelectedPixel] = useState<Point | undefined>();
  const [currentColor, setCurrentColor] = useState<string>(AVAILABLE_COLORS[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { client } = useAggieCanvasClient();
  const { user } = useAuthContext();

  const runThroughPixelUpdates = (updates: PixelUpdate[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const newPixel = ctx.createImageData(1, 1);
    for (const { row, column, color } of updates) {
      const [r, g, b] = getRgb(color);

      newPixel.data[0] = r; // R value
      newPixel.data[1] = g;
      newPixel.data[2] = b;
      newPixel.data[3] = 255; // (fully opaque)

      ctx.putImageData(newPixel, column, row);
    }
  };

  useEffect(() => {
    if (!transformWrapper.current || !selectedPixel) return;

    setTimeout(() => {
      if (!canvasRef.current || !transformWrapper.current) return;

      const targetScale =
        Math.max(
          canvasRef.current.clientWidth,
          canvasRef.current.clientHeight
        ) / 50;

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
    if (!ctx) return;

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

      if (snapshot)
        for (let i = 0; i < 3; i++) {
          blinkingPixel.data[i] =
            snapshot[(selectedPixel.y * rows + selectedPixel.x) * 3 + i];
        }

      ctx.putImageData(blinkingPixel, selectedPixel.x, selectedPixel.y);
    };
  }, [snapshot, selectedPixel, pixelUpdatesSinceLastSnapshot]);

  useEffect(() => {
    runThroughPixelUpdates(pixelUpdatesSinceLastSnapshot);
  }, [pixelUpdatesSinceLastSnapshot]);

  const pushPixel = () => {
    if (selectedPixel) {
      setIsLoading(true);
      client
        .postGridByIdPixel(gridId, {
          row: selectedPixel.y,
          column: selectedPixel.x,
          color:
            parseInt(currentColor.replaceAll("#", "").toLowerCase(), 16) >>> 0,
        })
        .then(() => {
          const update = updateGrid();
          update.then(() => {
            setSelectedPixel(undefined);
            setTimeout(() => {
              setIsLoading(false);
            }, 100); // don't stop loading too fast
          });
        });
    }
  };

  const onCanvasClick = () => {
    setMouseDown(false);
    if (isDragging) {
      setIsDragging(false);
      return;
    }

    if (
      selectedPixel &&
      selectedPixel.y === hoveringPixel?.y &&
      selectedPixel.x === hoveringPixel?.x
    ) {
      setSelectedPixel(undefined);
      return;
    }

    setSelectedPixel(hoveringPixel);
  };

  const onCanvasMouseMove = (e: { clientX: number; clientY: number }) => {
    setIsDragging(mouseDown);

    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * columns);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * rows);

    if (!hoveringPixel || x !== hoveringPixel.x || y !== hoveringPixel.y) {
      setHoveringPixel({ x, y });
    }
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
            onMouseMove={onCanvasMouseMove}
            onMouseDown={() => setMouseDown(true)}
            onMouseUp={onCanvasClick}
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
          aria-busy={!!isLoading}
          disabled={isLoading || !user || !selectedPixel}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
