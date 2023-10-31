import { setup } from "@api/setup";
import Elysia, { NotFoundError, t } from "elysia";
import { Grid, PixelUpdate } from "@lib/database/dao/PixelDAO";

const MAX_PUSH_UPDATES_BEFORE_SNAPSHOT = 30;

export const pixelController = new Elysia().use(setup).group("/grid", (app) => {
  const {
    store: { pixelDAO, userDAO, throwUnlessAuthed },
  } = app;

  app.get(
    "/list",
    async () => {
      return await pixelDAO.listGrids();
    },
    {
      response: t.Array(
        t.Object({
          id: t.Number(),
          rows: t.Number(),
          columns: t.Number(),
          name: t.String(),
        })
      ),
    }
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
        latestSnapshot?.created_at.getTime() ?? "1970-01-01" // the beginning of time
      );

      const updates = await pixelDAO.updatesSince(id, lastSnapshotTime);
      if (updates.length > MAX_PUSH_UPDATES_BEFORE_SNAPSHOT) {
        await pixelDAO.takeSnapshot(id);
      }

      const session = await userDAO.findSession(userSession.value);
      const grid = await pixelDAO.findGrid(id);
      if (!grid) throw new NotFoundError();

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
      beforeHandle: async ({ cookie: { userSession } }) =>
        throwUnlessAuthed(userSession.value),
      params: t.Object({
        id: t.Numeric(),
      }),
      body: t.Object({
        column: t.Integer(),
        row: t.Integer(),
        color: t.Integer({ minimum: 0, maximum: Math.pow(2, 32) - 1 }),
      }),
      response: t.Object({
        success: t.Boolean(),
      }),
    }
  );

  app.post(
    "/new",
    async ({ cookie: { userSession }, body: { name, rows, columns } }) => {
      const userWithSession = await userDAO.findSessionAndUser(
        userSession.value
      );
      const isAdmin = process.env.ADMIN_USERNAMES?.split(",")
        .map((x) => x.toLowerCase())
        .includes(userWithSession?.user?.username.toLowerCase() ?? "");

      if (!isAdmin) throw new Error("You can't do that!");

      const newGrid: Grid = {
        name,
        rows,
        columns,
      };
      const grid = await pixelDAO.saveGrid(newGrid);

      await pixelDAO.takeSnapshot(grid.id!);

      return { success: true };
    },
    {
      beforeHandle: async ({ cookie: { userSession } }) =>
        throwUnlessAuthed(userSession.value),
      body: t.Object({
        name: t.String(),
        columns: t.Integer({ minimum: 10, maximum: 200 }),
        rows: t.Integer({ minimum: 10, maximum: 200 }),
      }),
      response: t.Object({
        success: t.Boolean(),
      }),
    }
  );

  app.get(
    "/:id",
    async ({ params: { id }, query: { last } }) => {
      const grid = await pixelDAO.findGrid(id);
      if (!grid) throw new NotFoundError();

      const latestSnapshot = await pixelDAO.latestSnapshot(id);
      const getUpdatesFrom = new Date(
        Math.max(
          last?.getTime() ?? 0,
          latestSnapshot?.created_at.getTime() ?? -1
        )
      );

      const updates = [];
      if (latestSnapshot) {
        const file = Bun.file(
          process.env.SNAPSHOTS_LOCATION_PREFIX! +
            latestSnapshot.snapshot_location
        );
        const bytes = new Uint8Array(await file.arrayBuffer());
        updates.push({
          rows: latestSnapshot.rows,
          columns: latestSnapshot.columns,
          snapshot: bytes,
          snapshotTime: latestSnapshot.created_at,
        });
      }
      for (const update of await pixelDAO.updatesSince(id, getUpdatesFrom)) {
        updates.push({
          column: update.column,
          row: update.row,
          color: update.color,
          placedAt: update.created_at,
          userId: update.user_id,
        });
      }

      return {
        name: grid.name,
        rows: grid.rows,
        columns: grid.columns,
        updates,
      };
    },
    {
      params: t.Object({ id: t.Numeric() }),
      query: t.Object({ last: t.Optional(t.Date()) }),
      response: t.Object({
        name: t.String(),
        rows: t.Number(),
        columns: t.Number(),
        updates: t.Array(
          t.Any([
            t.Object({
              column: t.Number(),
              row: t.Number(),
              color: t.Number(),
              placedAt: t.Date(),
              userId: t.Number(),
            }),
            t.Object({
              rows: t.Number(),
              columns: t.Number(),
              snapshot: t.Uint8Array(),
              snapshotTime: t.Date(),
            }),
          ])
        ),
      }),
    }
  );

  return app;
});
