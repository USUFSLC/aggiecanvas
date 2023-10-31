import Elysia from "elysia";
import { setup } from "./setup";
import { authController } from "./controllers/auth";

export * from "./setup";

const app = new Elysia().group("/api", (app) =>
  app.use(setup).use(authController)
);
app.listen(process.env.PORT ?? 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
