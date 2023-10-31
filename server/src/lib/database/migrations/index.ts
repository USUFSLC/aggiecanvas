import knex from "knex";
import { aggieCanvasDbConfig } from "../configs";
import { addUsers } from "./0_create_users";

export const migrationOrder = [addUsers];

export const initDB = async () => {
  const knexInstance = knex(aggieCanvasDbConfig);
  for (const migration of migrationOrder) {
    await migration(knexInstance);
  }
  await knexInstance.destroy();
};

await initDB();
