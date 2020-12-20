import Hapi from "hapi";
import routes from "./routes/index.js";
import config from './config'
import jwt from "jsonwebtoken";

const AuthBearer = require("hapi-auth-bearer-token");
const Inert = require("inert");

const server = Hapi.server({
  port: config.PORT,
  host: config.HOST,
  routes: { cors: { origin: ["*"] } }
});

init();
async function init() {
  await server.register([AuthBearer, Inert]);

  server.auth.strategy("token", "bearer-access-token", {
    allowQueryToken: true, // optional, false by default
    validate: async (request, token) => {
      let isValid;
      let credentials = {};
      await jwt.verify(token, config.token, (err, decoded) => {
        if (err) {
          isValid = false;
        } else {
          isValid = true;
          credentials = decoded;
        }
      });
      return { isValid, credentials };
    }
  });

  server.auth.default("token");

  server.route(routes);

  await start();
}

async function start() {
  try {
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log("Server running at:", server.info.uri);
}
