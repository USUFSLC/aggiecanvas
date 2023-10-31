import { logOverPromise } from "@lib/utils";
import { Knex } from "knex";

export const createPixels = async (knex: Knex) => {
  const hasPixels = await logOverPromise<boolean>(
    "do we have grids, snapshots, and updates",
    knex.schema.hasTable("grids")
  );
  if (!hasPixels) {
    await logOverPromise(
      "adding grids, pixels, snapshots tables",
      knex.schema
        .createTable("grids", (table) => {
          table.increments("id").primary();
          table.string("name");

          table.integer("rows").unsigned().notNullable();
          table.integer("columns").unsigned().notNullable();

          table.timestamp("created_at").defaultTo(knex.raw("NOW()"));
        })
        .then(() =>
          knex.schema.createTable("pixel_updates", (table) => {
            table.bigIncrements("id").primary();

            table
              .integer("grid_id")
              .references("id")
              .inTable("grids")
              .index()
              .onDelete("CASCADE");

            table
              .integer("user_id")
              .references("id")
              .inTable("users")
              .index()
              .onDelete("SET NULL");

            table.integer("row").unsigned();
            table.integer("column").unsigned();
            table.integer("color").unsigned();
            table.timestamp("created_at");

            table.index(["grid_id", "created_at"]);
            table.index(["grid_id", "row", "column", "created_at"]);
            table.unique(["grid_id", "row", "column", "created_at"]);
          })
        )
        .then(() =>
          knex.schema.createTable("grid_snapshots", (table) => {
            table.increments("id").primary();

            table
              .integer("grid_id")
              .references("id")
              .inTable("grids")
              .onDelete("cascade");

            table.string("snapshot_location").notNullable();

            table.integer("rows").unsigned().notNullable();
            table.integer("columns").unsigned().notNullable();

            table.timestamp("created_at").index().defaultTo(knex.raw("NOW()"));
            table.index(["grid_id", "created_at"]);
          })
        )
    );
  }
};
