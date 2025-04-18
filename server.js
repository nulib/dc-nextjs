const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const port = 3000;
const dev = process.env.NODE_ENV !== "production";
const hostname = "local.dev.rdc.library.northwestern.edu";
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const httpsOptions = {
  cert: fs.readFileSync(process.env.SSL_CERT),
  key: fs.readFileSync(process.env.SSL_KEY),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`ready - started server on url: https://${hostname}:${port}`);
  });
});
