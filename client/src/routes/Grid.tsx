import { PlaceGrid } from "@/components/PlaceGrid";
import { useAggieCanvasClient } from "@/context/AggieCanvasClient";
import { PixelUpdate, applyUpdatesToSnapshot } from "@/utils/snapshot";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type GridInfo = { columns: number; rows: number; name: string };

interface Snapshot {
  rows: number;
  columns: number;
  data: Uint8Array;
}

export const Grid = () => {
  const { id } = useParams();

  const [grid, setGrid] = useState<GridInfo>();
  const [lastUpdate, setLastUpdate] = useState(new Date("1970-01-01"));
  const { client } = useAggieCanvasClient();
  const [snapshot, setSnapshot] = useState<Snapshot>();
  const [pixelUpdatesSinceLastSnapshot, setPixelUpdatesSinceLastSnapshot] =
    useState<PixelUpdate[]>([]);

  const updateGrid = async () => {
    const newGrid = await client
      .getGridById({ id, last: lastUpdate.toISOString() })
      .then((r) => r.data);
    setLastUpdate(new Date());

    let currentSnapshot: Snapshot | undefined = snapshot;

    const snapshotUpdateIdx = newGrid.updates.findLastIndex(
      (update) => update.snapshotId
    );

    if (snapshotUpdateIdx != -1) {
      const snapshotupdate = newGrid.updates[snapshotUpdateIdx];

      currentSnapshot = await client
        .getGridSnapshotById(snapshotupdate.snapshotId, null, {
          responseType: "arraybuffer",
        })
        .then((snapshot) => {
          return {
            rows: snapshotupdate.rows,
            columns: snapshotupdate.columns,
            data: new Uint8Array(snapshot.data as unknown as Buffer),
          };
        });
    }

    if (
      (snapshotUpdateIdx !== -1 ||
        newGrid.rows !== grid?.rows ||
        newGrid.columns !== grid?.columns) &&
      currentSnapshot
    ) {
      currentSnapshot.data = applyUpdatesToSnapshot(
        currentSnapshot.data,
        currentSnapshot.rows,
        currentSnapshot.columns,
        newGrid.updates.slice(
          snapshotUpdateIdx + 1,
          newGrid.updates.length
        ) as PixelUpdate[],
        newGrid.rows,
        newGrid.columns
      );

      setPixelUpdatesSinceLastSnapshot([]);
      setSnapshot(currentSnapshot);
    } else {
      setPixelUpdatesSinceLastSnapshot((updates) => [
        ...(updates ?? []),
        ...newGrid.updates,
      ]);
    }

    setGrid(newGrid);
  };

  useEffect(() => {
    updateGrid();
  }, []);

  useEffect(() => {
    const updateInterval = setInterval(updateGrid, 1_000);

    return () => clearInterval(updateInterval);
  }, [lastUpdate]);

  return snapshot ? (
    <PlaceGrid
      pixelUpdatesSinceLastSnapshot={pixelUpdatesSinceLastSnapshot}
      gridId={Number(id)}
      updateGrid={updateGrid}
      rows={snapshot.rows}
      columns={snapshot.columns}
      snapshot={snapshot.data}
    />
  ) : (
    <div aria-busy="true"></div>
  );
};
