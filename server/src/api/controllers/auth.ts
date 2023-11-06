import { setup } from "@api/setup";
import { User } from "@lib/database/dao";
import { randomUUID } from "crypto";
import { Elysia, NotFoundError, t } from "elysia";

const A_NUMBER_REGEX = new RegExp(/^a[0-9]{8}$/i);
const tokenExpiration = 12 * 60 * 60 * 1000;
const getTokenExpirationFromNow = () => new Date(Date.now() + tokenExpiration);

const SessionDTO = t.Object({
  id: t.String(),
  user_id: t.Number(),
  expires: t.Date(),
});

const UserDTO = t.Object({
  username: t.Optional(t.String()),
});

export const authController = new Elysia().use(setup).group("/auth", (app) => {
  const {
    store: { userDAO, aggieAuthClient, throwUnlessAuthed },
  } = app;

  app.post(
    "/aggie",
    async ({ body: { anumber } }) => {
      const { token, expire_at } = await aggieAuthClient
        .postAuthaggie(null, {
          anumber: anumber.toLowerCase(),
        })
        .then(({ data }) => data);

      if (token) {
        let user: User =
          (await userDAO.findByUsername(anumber)) ??
          (await userDAO.save({
            username: anumber,
          }));

        await userDAO.saveAggieAuthToken({
          user_id: user.id!,
          token,
          expires: expire_at,
        });
      }

      return { success: true };
    },
    {
      body: t.Object({ anumber: t.RegExp(A_NUMBER_REGEX, { default: "" }) }),
      response: t.Object({ success: t.Boolean() }),
    },
  );

  app.get(
    "/aggie_auth_callback",
    async ({ query: { token, redirect }, cookie: { userSession }, set }) => {
      const aggieToken = await userDAO.findAggieToken(token);

      if (!aggieToken || aggieToken.expires.getTime() <= Date.now())
        throw new NotFoundError();

      const id = randomUUID();
      const expires = getTokenExpirationFromNow();
      const newSession = {
        id,
        user_id: aggieToken.user_id,
        expires,
      };

      await userDAO.saveSession(newSession);
      await userDAO.deleteAggieAuthToken(token);

      userSession.value = id;
      userSession.path = "/";
      userSession.expires = expires;
      userSession.httpOnly = true;
      userSession.secure = true;
      userSession.sameSite = true;

      if (redirect) {
        set.redirect = "/";
      }
      return newSession;
    },
    {
      query: t.Object({
        token: t.String(),
        redirect: t.Boolean({ default: true }),
      }),
      response: SessionDTO,
    },
  );

  app.get(
    "/me",
    async ({ cookie: { userSession }, set }) => {
      const session = await userDAO.findSessionAndUser(userSession.value);
      if (!session) {
        set.status = 401;
        return {};
      }
      return { username: session.user.username };
    },
    {
      beforeHandle: async ({ cookie: { userSession } }) =>
        throwUnlessAuthed(userSession.value),
      response: UserDTO,
    },
  );

  app.get(
    "/logout",
    async ({ cookie: { userSession } }) => {
      if (!userSession) {
        return { success: true };
      }

      const session = await userDAO.findSession(userSession.value);
      userSession.remove();
      if (!session) {
        return { success: true };
      }

      if (session) {
        session.expires = new Date();
      }
      await userDAO.saveSession(session);

      return { success: true };
    },
    {
      response: t.Object({
        success: t.Boolean(),
      }),
    },
  );

  return app;
});
