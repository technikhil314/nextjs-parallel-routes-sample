import type { NextFunction, Request, Response } from "express";
import express from "express";
import http from "http";
import next from "next";
import type { NextServer } from "next/dist/server/next";

const PORT = 3000;

export function staticRequestChecker(
  app: NextServer & { hasStaticDir?: boolean },
  basePath = ""
) {
  const { hasStaticDir } = app;
  if (basePath && !basePath.startsWith("/")) basePath = `/${basePath}`;
  const nextRegex = new RegExp(`^${basePath}/_next/(?!data)`);
  const staticRegex = hasStaticDir && new RegExp(`^${basePath}/_static/`);
  return (req: Request) => {
    const url = req.url || "";
    return url.match(nextRegex) || (staticRegex && url.match(staticRegex));
  };
}

const nextApp = next({
  dev: true,
  hostname: "localhost",
  port: PORT,
});
const exapp = express();
const isStaticRequest = staticRequestChecker(nextApp, "/");
exapp.use((req: Request, res: Response, next: NextFunction) => {
  let nextReqHandler = nextApp.getRequestHandler();
  if (isStaticRequest(req)) {
    return nextReqHandler(req, res);
  }
  return next();
});
exapp.all("*", (req, res) => {
  if (req.originalUrl.includes("/route1") && req.method === "GET") {
    // if you do not set this cookie then server_action_cookie is set correctly on UA
    // but if you set this cookie here then this overrides server_action_cookie
    res.cookie("GET_COOKIE", "GET_COOKIE");
  }
  let nextReqHandler = nextApp.getRequestHandler();
  return nextReqHandler(req, res);
});
const server = http.createServer(exapp);
nextApp.prepare();
server.listen(PORT);
