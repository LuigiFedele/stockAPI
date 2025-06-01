/* eslint-disable no-unused-vars */
import { CreateCategory } from '../../../usecases';
import { Controller, HttpRequest, HttpResponse, Validation } from '../../interfaces';
import {
  badRequest,
  created,
  serverError,
} from '../../presentations/api/httpResponses/httpResponses';

export class CreateCategoryController implements Controller {
  constructor(
    private readonly createCategory: CreateCategory,
    private readonly validation: Validation,
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }

      const { name } = httpRequest.body;
      if (!name) {
        return badRequest(new Error('Missing required fields'));
      }

      const category = await this.createCategory.create({
        name,
      });
      return created(category);
    } catch (error) {
      return serverError(error as Error);
    }
  }
}
