import { Request, Response } from 'express';
import { Controller } from './interfaces/controller';

export const expressRouteAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest = {
      body: req.body,
      params: req.params,
    };
    const httpResponse = await controller.handle(httpRequest);

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      res.status(httpResponse.statusCode).json({ error: httpResponse.body.message });
    }
  };
};
