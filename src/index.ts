import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import { routes } from "./routes";
import { config } from "./configs";
import { authenticated } from "./middlewares/authenticate.middleware";

// Init app and database connection
const app: Express = express();

// Middlewares
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieSession({
  name: 'ISS_SESSION_ID',
  keys: [config.server.sessionKey],

  maxAge: 24 * 60 * 60 * 1000, // 1 day
  httpOnly: true,
  sameSite: 'strict',
}))
app.use(authenticated);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  return;
});

// API
app.use("/api/v1", routes);

// Run app
app.listen(config.server.port, () => {
  console.log(
    `⚡️[server]: Server is running at http://localhost:${config.server.port}`
  );
});
