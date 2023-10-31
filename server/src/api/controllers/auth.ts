import { setup } from "@api/setup";
import { User } from "@lib/database/dao";
import { randomUUID } from "crypto";
import { Elysia, NotFoundError, t } from "elysia";

const A_NUMBER_REGEX = new RegExp(/^a[0-9]{8}$/i);
const tokenExpiration = 12 * 60 * 60 * 1000;
const getTokenExpirationFromNow = () => new Date(Date.now() + tokenExpiration);

export const authController = new Elysia().use(setup).group("/auth", (app) => {
  const {
    store: { userDAO, aggieAuthClient },
  } = app;

  app.post(
    "/aggie",
    async ({ body: { anumber } }) => {
      const { token, expire_at } = await aggieAuthClient
        .postAuthaggie(null, {
          anumber,
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
      body: t.Object({ anumber: t.RegExp(A_NUMBER_REGEX) }),
      response: t.Object({ success: t.Boolean() }),
    }
  );

  app.get(
    "/aggie_auth_callback",
    async ({ query: { token }, cookie: { userSession } }) => {
      const aggieToken = await userDAO.findAggieToken(token);

      if (aggieToken && aggieToken.expires.getTime() > Date.now()) {
        const id = randomUUID();
        const expires = getTokenExpirationFromNow();
        await userDAO.saveSession({
          id,
          user_id: aggieToken.user_id,
          expires,
        });
        await userDAO.deleteAggieAuthToken(token);

        userSession.value = id;
        userSession.path = "/";
        userSession.expires = expires;
        userSession.httpOnly = true;
        userSession.secure = true;
        userSession.sameSite = true;

        return { sessionId: id };
      }
      throw new NotFoundError();
    },
    {
      query: t.Object({
        token: t.String(),
      }),
      response: t.Object({
        sessionId: t.String(),
      }),
    }
  );

  app.get(
    "/logout",
    async ({ cookie: { userSession } }) => {
      const session = await userDAO.findSession(userSession.value);
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
    }
  );

  return app;
});
