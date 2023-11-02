import { useAggieCanvasClient } from "@/context/AggieCanvasClient";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SnapshotImage } from "./SnapshotImage";

export interface GridCardProps {
  name: string;
  id: number;
  created_at: Date;
  latest_snapshot?: {
    id: number;
    rows: number;
    columns: number;
  };
}

export const GridCard = ({
  name,
  id,
  created_at,
  latest_snapshot,
}: GridCardProps) => {
  const canvasRef = useRef(null);
  const { client } = useAggieCanvasClient();
  const [snapshot, setSnapshot] = useState<Uint8Array>();

  useEffect(() => {
    if (latest_snapshot) {
      client
        .getGridSnapshotById(latest_snapshot.id, null, {
          responseType: "arraybuffer",
        })
        .then((snapshot) => {
          setSnapshot(new Uint8Array(snapshot.data as unknown as Buffer));
        });
    }
  }, []);

  const nav = useNavigate();

  return (
    <article onClick={() => nav(`/grid/${id}`)}>
      <header>
        <span>
          {name} | {created_at.toLocaleString()}
        </span>
      </header>

      {latest_snapshot && (
        <div className="card">
          <SnapshotImage
            canvasRef={canvasRef}
            rows={latest_snapshot.rows}
            columns={latest_snapshot.columns}
            snapshot={snapshot}
          />
        </div>
      )}
    </article>
  );
};
