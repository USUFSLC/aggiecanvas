import { applyUpdatesToSnapshot, encodeSnapshot } from "@lib/utils/snapshot";
import { randomUUID } from "crypto";
import { Knex } from "knex";
import { unlinkSync } from "fs";

export interface Grid {
  id?: number;
  name: string;

  rows: number;
  columns: number;

  created_at?: Date;
}

export interface GridSnapshot {
  id?: number;

  grid_id: number;
  rows: number;
  columns: number;

  snapshot_location: string;
  created_at: Date;
}

export interface PixelUpdate {
  id?: number;

  user_id: number;
  color: number;

  grid_id: number;
  row: number;
  column: number;

  created_at: Date;
}

export class PixelDAO {
  static GridsTable = "grids";
  static SnapshotsTable = "grid_snapshots";
  static PixelUpdatesTable = "pixel_updates";

  private knexInstance: Knex;
  constructor(knexInstance: Knex) {
    this.knexInstance = knexInstance;
  }

  public async listGrids() {
    const grids = await this.knexInstance<Grid>(PixelDAO.GridsTable).orderBy(
      "created_at",
      "desc"
    );

    return grids as (Omit<Grid, "id"> & { id: number })[];
  }

  public async findGrid(grid_id: number): Promise<Grid | undefined> {
    const [grid] = await this.knexInstance<Grid>(PixelDAO.GridsTable)
      .where("id", grid_id)
      .limit(1);

    return grid;
  }

  public async latestSnapshot(
    grid_id: number
  ): Promise<GridSnapshot | undefined> {
    const [snapshot] = await this.knexInstance<GridSnapshot>(
      PixelDAO.SnapshotsTable
    )
      .where("grid_id", grid_id)
      .orderBy("created_at", "desc")
      .limit(1);

    return snapshot;
  }

  public async updatesSince(
    grid_id: number,
    date: Date
  ): Promise<PixelUpdate[]> {
    const updates = await this.knexInstance<PixelUpdate>(
      PixelDAO.PixelUpdatesTable
    )
      .where("created_at", ">=", date)
      .where("grid_id", grid_id);

    return updates;
  }

  public async lastPixelUpdate(
    grid_id: number,
    row: number,
    col: number
  ): Promise<PixelUpdate | undefined> {
    const [update] = await this.knexInstance<PixelUpdate>(
      PixelDAO.PixelUpdatesTable
    )
      .where("grid_id", grid_id)
      .where("column", col)
      .where("row", row)
      .orderBy("created_at", "desc")
      .limit(1);
    return update;
  }

  public async saveGrid(grid: Grid) {
    const [newGrid] = await this.knexInstance<Grid>(PixelDAO.GridsTable)
      .insert(grid)
      .onConflict(["id"])
      .merge()
      .returning("*");

    return newGrid;
  }

  public async saveSnapshot(snapshot: GridSnapshot) {
    const [newSnapshot] = await this.knexInstance<GridSnapshot>(
      PixelDAO.SnapshotsTable
    )
      .insert(snapshot)
      .onConflict(["id"])
      .merge()
      .returning("*");

    return newSnapshot;
  }

  public async savePixelUpdate(pixelUpdate: PixelUpdate) {
    const [newUpdate] = await this.knexInstance<PixelUpdate>(
      PixelDAO.PixelUpdatesTable
    )
      .insert(pixelUpdate)
      .onConflict(["id"])
      .merge()
      .returning("*");

    return newUpdate;
  }

  public async deleteSnapshot(snapshot: GridSnapshot) {
    const path =
      process.env.SNAPSHOTS_LOCATION_PREFIX! + snapshot.snapshot_location;
    unlinkSync(path);

    await this.knexInstance(PixelDAO.SnapshotsTable)
      .where("id", snapshot.id!)
      .delete();
  }

  public async takeSnapshot(grid_id: number) {
    const grid = await this.findGrid(grid_id);
    if (!grid) return;

    const newSnapshot: GridSnapshot = {
      grid_id,
      created_at: new Date(),
      rows: grid.rows,
      columns: grid.columns,
      snapshot_location: randomUUID(),
    };

    const old = await this.latestSnapshot(grid_id);
    const updatesSince = await this.updatesSince(
      grid_id,
      old?.created_at ?? new Date("1970-01-01")
    );

    let oldBytes = Uint8Array.from([]);
    if (old) {
      const oldSnapshotPath =
        process.env.SNAPSHOTS_LOCATION_PREFIX! + old.snapshot_location;

      const file = Bun.file(oldSnapshotPath);
      const buffer = await file.arrayBuffer();
      oldBytes = new Uint8Array(buffer);
    }
    const bytes = applyUpdatesToSnapshot(
      oldBytes,
      old ? old.rows : 0,
      old ? old.columns : 0,
      updatesSince.map(({ row, column, color }) => {
        return {
          row,
          column,
          color,
        };
      }),
      grid.rows,
      grid.columns
    );

    const writer = Bun.file(
      process.env.SNAPSHOTS_LOCATION_PREFIX! + newSnapshot.snapshot_location
    );
    await Bun.write(writer, bytes);

    const saved = await this.saveSnapshot(newSnapshot);

    if (old) await this.deleteSnapshot(old);
    return saved;
  }
}
