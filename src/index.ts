import express, { Express, Request, Response, NextFunction, Errback } from "express";
import bodyParser from "body-parser";
import { routes } from "./routes";
import { config } from "./configs";

const app: Express = express();

// Middlewares
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
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
