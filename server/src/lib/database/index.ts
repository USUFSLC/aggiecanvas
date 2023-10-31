import { knex } from "knex";
import { aggieCanvasDbConfig } from "./configs";

export const newAggieCanvasConnection = () => knex(aggieCanvasDbConfig);

export * from "./configs";
