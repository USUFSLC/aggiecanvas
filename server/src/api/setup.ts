import Elysia from "elysia";
import { newAggieCanvasConnection } from "@lib/database";
import { UserDAO, PixelDAO } from "@lib/database/dao";

import OpenAPIClientAxios from "openapi-client-axios";
import { Client as AggieAuthClient } from "../aggie-auth";

// aggie auth
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

// dao layer stuff
const aggieCanvasConn = newAggieCanvasConnection();
const userDAO = new UserDAO(aggieCanvasConn);
const pixelDAO = new PixelDAO(aggieCanvasConn);

// auth stuff
export class UnauthorizedError extends Error {}

const throwUnlessAuthed = async (sessionId: string): Promise<void> => {
  const session = sessionId ? await userDAO.findSession(sessionId) : false;
  if (!session || !(session && session.expires.getTime() > Date.now())) {
    throw new UnauthorizedError("Unauthorized");
  }
};

const throwUnlessAdmin = async (sessionId: string): Promise<void> => {
  await throwUnlessAuthed(sessionId);

  let isAdmin = false;
  const userSession = await userDAO.findSessionAndUser(sessionId);
  if (userSession) {
    isAdmin = !!process.env.ADMIN_USERNAMES?.split(",")
      .map((x) => x.toLowerCase())
      .includes(userSession.user?.username.toLowerCase() ?? "");
  }

  if (!isAdmin) throw new UnauthorizedError("You can't do that!");
};

// the api

export const setup = new Elysia({ name: "setup" })
  .error({
    UnauthorizedError,
  })
  .onError(({ code, error, set }) => {
    if (code === "UnauthorizedError") {
      set.status = 401;
      return error.message;
    }
  })
  .state("userDAO", userDAO)
  .state("pixelDAO", pixelDAO)
  .state("throwUnlessAuthed", throwUnlessAuthed)
  .state("throwUnlessAdmin", throwUnlessAdmin)
  .state("aggieAuthClient", aggieAuthClient);
