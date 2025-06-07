import { DeleteCategory } from '../../../usecases';
import { HttpRequest, HttpResponse, Controller, Validation } from '../../interfaces';
import {
  badRequest,
  noContent,
  serverError,
} from '../../presentations/api/httpResponses/httpResponses';

export class DeleteCategoryController implements Controller {
  constructor(
    private readonly deleteCategory: DeleteCategory,
    private readonly validation: Validation,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.body;
      const isInvalid = this.validation.validate({ id });
      if (isInvalid) {
        return badRequest(isInvalid);
      }
      const error = await this.deleteCategory.delete({ id });
      if (error) {
        return serverError(error);
      }
      return noContent();
    } catch (error: any) {
      return serverError(error);
    }
  }
}
