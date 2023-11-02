import Elysia from "elysia";
import { setup } from "@/api/setup";
import { authController, pixelController } from "@/api/controllers";
import swagger from "@elysiajs/swagger";

export * from "./setup";

const app = new Elysia().group("/api", (app) =>
  app.use(setup).use(authController).use(pixelController).use(swagger())
);
app.listen({
  port: process.env.PORT ?? 3000,
  hostname: process.env.HOST ?? "0.0.0.0",
});

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
