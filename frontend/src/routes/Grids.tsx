import { GridCard } from "@/components/GridCard";
import { useAggieCanvasClient } from "@/context/AggieCanvasClient";
import { useEffect, useState } from "react";

export const Grids = () => {
  const { client } = useAggieCanvasClient();
  const [grids, setGrids] = useState<
    {
      id: number;
      name: string;
      created_at: string;
      latest_snapshot: { id: number; rows: number; columns: number };
    }[]
  >([]);

  useEffect(() => {
    client.getGridList().then((grids) => setGrids(grids.data));
  }, []);

  return (
    <div>
      <div className="grid">
        {grids.map((grid) => {
          return (
            <GridCard
              key={grid.id}
              id={grid.id}
              name={grid.name}
              created_at={new Date(grid.created_at)}
              latest_snapshot={grid.latest_snapshot}
            />
          );
        })}
      </div>
    </div>
  );
};
