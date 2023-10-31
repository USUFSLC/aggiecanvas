import { logOverPromise } from "@lib/utils";
import { Knex } from "knex";

export const addUsers = async (knex: Knex) => {
  const hasUsers = await logOverPromise<boolean>(
    "do we have users",
    knex.schema.hasTable("users")
  );

  if (!hasUsers) {
    await logOverPromise(
      "adding citext extension",
      knex.schema.raw("CREATE EXTENSION IF NOT EXISTS CITEXT")
    );

    await logOverPromise(
      "adding users and users_sessions tables",
      knex.schema
        .createTable("users", (table) => {
          table.increments("id").primary();
          table.specificType("username", "citext").index().unique();

          table.timestamp("created_at").defaultTo(knex.raw("NOW()"));
        })
        .then(() =>
          knex.schema.createTable("users_sessions", (table) => {
            table.uuid("id").primary();

            table.timestamp("expires").index();
            table.timestamp("created_at").defaultTo(knex.raw("NOW()"));

            table
              .integer("user_id")
              .index()
              .references("id")
              .inTable("users")
              .onDelete("CASCADE");
          })
        )
        .then(() =>
          knex.schema.createTable("aggie_auth_tokens", (table) => {
            table.string("token").primary();

            table.timestamp("created_at").defaultTo(knex.raw("NOW()"));
            table.timestamp("expires").index();

            table
              .integer("user_id")
              .index()
              .references("id")
              .inTable("users")
              .onDelete("CASCADE");
          })
        )
    );
  }
};
