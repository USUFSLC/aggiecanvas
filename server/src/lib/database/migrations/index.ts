import knex from "knex";
import { aggieCanvasDbConfig } from "../configs";
import { addUsers } from "./0_create_users";
import { createPixels } from "./1_create_pixels";

export const migrationOrder = [addUsers, createPixels];

export const initDB = async () => {
  const knexInstance = knex(aggieCanvasDbConfig);
  for (const migration of migrationOrder) {
    await migration(knexInstance);
  }
  await knexInstance.destroy();
};

await initDB();
