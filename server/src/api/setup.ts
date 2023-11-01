import Elysia from "elysia";
import { newAggieCanvasConnection } from "@lib/database";
import { UserDAO } from "@lib/database/dao";
import swagger from "@elysiajs/swagger";

import OpenAPIClientAxios from "openapi-client-axios";
import { Client as AggieAuthClient } from "../aggie-auth";
import { PixelDAO } from "@lib/database/dao/PixelDAO";

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
const pixelDAO = new PixelDAO(aggieCanvasConn);

const throwUnlessAuthed = async (sessionId: string): Promise<void> => {
  const session = sessionId ? await userDAO.findSession(sessionId) : false;
  if (!session || !(session && session.expires.getTime() > Date.now())) {
    throw new Error("Unauthorized");
  }
};

export const setup = new Elysia({ name: "setup" })
  .state("userDAO", userDAO)
  .state("pixelDAO", pixelDAO)
  .state("throwUnlessAuthed", throwUnlessAuthed)
  .state("aggieAuthClient", aggieAuthClient);
