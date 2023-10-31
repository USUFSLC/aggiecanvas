import Elysia from "elysia";
import { newAggieCanvasConnection } from "@lib/database";
import { UserDAO } from "@lib/database/dao";
import swagger from "@elysiajs/swagger";

import OpenAPIClientAxios from "openapi-client-axios";
import { Client as AggieAuthClient } from "../aggie-auth";

const aggieAuthApi = new OpenAPIClientAxios({
  definition: process.env.AGGIE_AUTH_HOST! + "/swagger/json",
  withServer: 0,
  axiosConfigDefaults: {
    headers: {
      Authorization: "Bearer " + process.env.AGGIE_AUTH_TOKEN,
    },
  },
});
aggieAuthApi.withServer({ url: process.env.AGGIE_AUTH_HOST! });
const aggieAuthClient = await aggieAuthApi.init<AggieAuthClient>();

const aggieCanvasConn = newAggieCanvasConnection();
const userDAO = new UserDAO(aggieCanvasConn);

export const setup = new Elysia({ name: "setup" })
  .use(swagger())
  .state("userDAO", userDAO)
  .state("aggieAuthClient", aggieAuthClient);
