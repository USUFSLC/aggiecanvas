import { PlaceGrid } from "@/components/PlaceGrid";
import { useAggieCanvasClient } from "@/context/AggieCanvasClient";
import { applyUpdatesToSnapshot } from "@/utils/snapshot";
import { useCallback, useEffect, useState } from "react";
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

  const updateGrid = useCallback(
    () =>
      client
        .getGridById({ id, last: lastUpdate.toISOString() })
        .then(async (r) => {
          const grid = r.data;
          setLastUpdate(new Date());
          setGrid(grid);

          let currentSnapshot: Snapshot | undefined = snapshot;

          const snapshotUpdateIdx = grid.updates.findLastIndex(
            (update) => update.snapshotId
          );
          if (snapshotUpdateIdx != -1) {
            const snapshotupdate = grid.updates[snapshotUpdateIdx];

            await client
              .getGridSnapshotById(snapshotupdate.snapshotId, null, {
                responseType: "arraybuffer",
              })
              .then((snapshot) => {
                currentSnapshot = {
                  rows: snapshotupdate.rows,
                  columns: snapshotupdate.columns,
                  data: new Uint8Array(snapshot.data as unknown as Buffer),
                };
              });
          }

          if (currentSnapshot)
            currentSnapshot.data = applyUpdatesToSnapshot(
              currentSnapshot.data,
              currentSnapshot.rows,
              currentSnapshot.columns,
              grid.updates.slice(snapshotUpdateIdx + 1, grid.updates.length),
              grid.rows,
              grid.columns
            );

          setSnapshot(currentSnapshot);
        })
        .catch((e) => console.error(e)),
    [client, id, snapshot, lastUpdate]
  );

  useEffect(() => {
    const updateInterval = setInterval(() => updateGrid(), 1_000);

    return () => clearInterval(updateInterval);
  }, [updateGrid]);

  return (
    snapshot && (
      <PlaceGrid
        gridId={Number(id)}
        updateGrid={updateGrid}
        rows={snapshot.rows}
        columns={snapshot.columns}
        snapshot={snapshot.data}
      />
    )
  );
};
