import { Express, Router } from "express";
import main  from "../routes/main";

export default (app: Express): void => {
  const router = Router();
  main(router);
  app.use("/api", router);
};