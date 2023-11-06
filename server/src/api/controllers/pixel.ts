import { setup } from "@api/setup";
import Elysia, { NotFoundError, t } from "elysia";
import { Grid, PixelUpdate } from "@lib/database/dao/PixelDAO";
import Stream from "@elysiajs/stream";

const MAX_PUSH_UPDATES_BEFORE_SNAPSHOT = 40;

const SuccessDTO = t.Object({
  success: t.Boolean(),
});

const PixelSetDTO = t.Object({
  column: t.Integer(),
  row: t.Integer(),
  color: t.Integer({ minimum: 0, maximum: Math.pow(2, 32) - 1 }),
});

const GridUpdateDTO = t.Object({
  name: t.String(),
  columns: t.Integer({ minimum: 10, maximum: 500 }),
  rows: t.Integer({ minimum: 10, maximum: 500 }),
});

const SnapshotDTO = t.Object({
  id: t.Number(),
  grid_id: t.Number(),
  rows: t.Number(),
  columns: t.Number(),
  snapshot_location: t.String(),
  created_at: t.String({ format: "date-time" }),
});

const PixelUpdateDTO = t.Object({
  column: t.Number(),
  row: t.Number(),
  color: t.Number(),
  created_at: t.String({ format: "date-time" }),
  user_id: t.Number(),
});

const GridDTO = t.Object({
  id: t.Number(),
  rows: t.Number(),
  columns: t.Number(),
  name: t.String(),
  public: t.Boolean(),
  latest_snapshot: t.Optional(SnapshotDTO),
});

export const pixelController = new Elysia().use(setup).group("/grid", (app) => {
  const {
    store: { pixelDAO, userDAO, throwUnlessAuthed, throwUnlessAdmin },
  } = app;

  app.get(
    "/list",
    async () =>
      (await pixelDAO.listGrids())
        .filter((grid) => grid.public)
        .map((grid) => {
          return {
            ...grid,
            created_at: grid.created_at!.toISOString(),
            latest_snapshot: grid.latest_snapshot
              ? {
                  ...grid.latest_snapshot,
                  created_at: grid.latest_snapshot.created_at!.toISOString(),
                }
              : undefined,
          };
        }),
    {
      description: "list grids and related snapshot file ids",
      response: t.Array(GridDTO),
    },
  );

  app.get(
    "/snapshot/:id",
    async ({ params: { id } }) => {
      const snapshot = await pixelDAO.findSnapshot(id);
      if (!snapshot) throw new NotFoundError();

      const file = await pixelDAO.getSnapshotFile(snapshot);
      if (await file.exists()) return new Stream(file.stream());
      throw new NotFoundError();
    },
    {
      description:
        "binary stream of a snapshot in simple 32-bit color (R << 16, G << 8, B) in 1-D array format",
      type: "text/plain",
      params: t.Object({ id: t.Numeric() }),
    },
  );

  app.get(
    "/:id",
    async ({ params: { id }, query: { last } }) => {
      const grid = await pixelDAO.findGrid(id);
      if (!grid || !grid.public) throw new NotFoundError();

      const latestSnapshot = await pixelDAO.latestSnapshot(id);
      const getUpdatesFrom = new Date(
        Math.max(
          new Date(last).getTime(),
          latestSnapshot?.created_at.getTime() ?? -1,
        ),
      );

      const updates = [];
      if (latestSnapshot?.created_at.getTime() == getUpdatesFrom.getTime()) {
        updates.push(latestSnapshot);
      }

      for (const pixelUpdate of await pixelDAO.updatesSince(
        id,
        getUpdatesFrom,
      )) {
        updates.push(pixelUpdate);
      }

      return {
        grid,
        updates,
      };
    },
    {
      params: t.Object({ id: t.Numeric() }),
      query: t.Object({ last: t.String({ format: "date-time" }) }),
      description:
        "get a list of updates applied to a grid starting from the previous snapshot or specified time",
      response: t.Object({
        grid: GridDTO,
        updates: t.Array(t.Any([PixelUpdateDTO, SnapshotDTO])),
      }),
    },
  );

  app.post(
    "/",
    async ({ body: { name, rows, columns } }) => {
      const newGrid: Omit<Grid, "id"> = {
        public: true,
        name,
        rows,
        columns,
      };
      const grid = await pixelDAO.saveGrid(newGrid);
      await pixelDAO.takeSnapshot(grid.id);
      return grid;
    },
    {
      description: "create a grid and then take a snapshot",
      beforeHandle: async ({ cookie: { userSession } }) =>
        throwUnlessAdmin(userSession.value),
      body: GridUpdateDTO,
      response: GridDTO,
    },
  );

  app.post(
    "/:id/pixel",
    async ({
      params: { id },
      cookie: { userSession },
      body: { row, column, color },
    }) => {
      const latestSnapshot = await pixelDAO.latestSnapshot(id);
      const lastSnapshotTime = new Date(
        latestSnapshot?.created_at.getTime() ?? "1970-01-01", // the beginning of time
      );

      const updates = await pixelDAO.updatesSince(id, lastSnapshotTime);
      if (updates.length > MAX_PUSH_UPDATES_BEFORE_SNAPSHOT) {
        await pixelDAO.takeSnapshot(id);
      }

      const session = await userDAO.findSession(userSession.value);
      const grid = await pixelDAO.findGrid(id);
      if (!grid || !grid.public) throw new NotFoundError();

      if (row >= grid?.rows || column >= grid?.columns) {
        return { success: false };
      }

      const newPixelUpdate: PixelUpdate = {
        user_id: session!.user_id,
        created_at: new Date(),
        color,
        grid_id: id,
        row,
        column,
      };

      await pixelDAO.savePixelUpdate(newPixelUpdate);
      return { success: true };
    },
    {
      description: "set a pixel's color on a grid",
      beforeHandle: async ({ cookie: { userSession } }) =>
        throwUnlessAuthed(userSession.value),
      params: t.Object({
        id: t.Numeric(),
      }),
      body: PixelSetDTO,
      response: SuccessDTO,
    },
  );

  app.put(
    "/:id",
    async ({ params: { id }, body: { name, rows, columns } }) => {
      const newGrid: Grid = {
        id,
        public: true,
        name,
        rows,
        columns,
      };
      const grid = await pixelDAO.saveGrid(newGrid);
      await pixelDAO.takeSnapshot(grid.id!);

      return grid;
    },
    {
      beforeHandle: async ({ cookie: { userSession } }) =>
        throwUnlessAdmin(userSession.value),
      description: "update a grid and then take a snapshot",
      params: t.Object({ id: t.Numeric() }),
      body: GridUpdateDTO,
      response: GridDTO,
    },
  );

  app.delete(
    "/:id",
    async ({ params: { id } }) => {
      await pixelDAO.deleteOldSnapshots(id);
      await pixelDAO.hideGrid(id);

      return { success: true };
    },
    {
      description: "delete a grid",
      beforeHandle: async ({ cookie: { userSession } }) =>
        throwUnlessAdmin(userSession.value),
      params: t.Object({ id: t.Numeric() }),
      response: SuccessDTO,
    },
  );

  return app;
});
