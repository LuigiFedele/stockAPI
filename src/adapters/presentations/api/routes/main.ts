import { Router } from "express";

export default (router: Router): void => {
  router.get("/teste", (req, res) => {
    res.send("Hello World!");
  });
};