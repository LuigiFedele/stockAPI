import { ListCategories } from '../../../usecases';
import { Controller, HttpRequest, HttpResponse } from '../../interfaces';
import { noContent, ok, serverError } from '../../presentations/api/httpResponses/httpResponses';

export class ListCategoriesController implements Controller {
  constructor(private readonly listCategories: ListCategories) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const categories = await this.listCategories.list();
      return categories.length > 0 ? ok(categories) : noContent();
    } catch (error: any) {
      return serverError(error);
    }
  }
}
