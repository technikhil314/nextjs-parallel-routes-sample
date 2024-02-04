import http from "http";
import next from "next";
import { parse } from "url";

const PORT = 3000;

async function main() {
  const app = next({
    dev: true,
    hostname: "localhost",
    port: PORT,
  });
  const handle = app.getRequestHandler();
  await app.prepare();
  const server = http.createServer(async (req: any, res: any) => {
    try {
      const parsedUrl = parse(req.url, true);
      if (parsedUrl.pathname === "/route1" && req.method === "GET") {
        res.setHeader("set-cookie", "GET_COOKIE=GET_COOKIE");
      }
      await handle(req, res, parsedUrl);
    } catch (err) {
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  });
  server.once("error", (err) => {
    console.error(err);
    process.exit(1);
  });
  server.listen(PORT, () => {
    console.log(`- Local: http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
