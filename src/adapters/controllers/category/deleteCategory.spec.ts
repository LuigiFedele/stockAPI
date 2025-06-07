import { DeleteCategory, DeleteCategoryModel } from '../../../usecases';
import { HttpRequest, HttpResponse, Validation } from '../../interfaces';
import { noContent, serverError } from '../../presentations/api/httpResponses/httpResponses';
import { DeleteCategoryController } from './deleteCategory';

const makeDeleteCategory = (): DeleteCategory => {
  class DeleteCategoryStub implements DeleteCategory {
    async delete(category: DeleteCategoryModel): Promise<Error | void> {
      return Promise.resolve();
    }
  }
  return new DeleteCategoryStub();
};

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error | undefined {
      return;
    }
  }
  return new ValidationStub();
};

interface SutTypes {
  sut: DeleteCategoryController;
  deleteCategoryStub: DeleteCategory;
  validationStub: Validation;
}

const makeSut = (): SutTypes => {
  const deleteCategoryStub = makeDeleteCategory();
  const validationStub = makeValidation();
  const sut = new DeleteCategoryController(deleteCategoryStub, validationStub);
  return {
    sut,
    deleteCategoryStub,
    validationStub,
  };
};

const makeFakeDeleteCategoryRequest = (): HttpRequest => ({
  body: {
    id: 'any_id',
  },
});

describe('DeleteCategory Controller', () => {
  test('Deve chamar DeleteCategory com valores corretos', async () => {
    const { sut, deleteCategoryStub } = makeSut();

    const deleteSpy = jest.spyOn(deleteCategoryStub, 'delete');

    await sut.handle(makeFakeDeleteCategoryRequest());

    expect(deleteSpy).toHaveBeenCalledWith({
      id: 'any_id',
    });
  });

  test('Deve retornar 204 em caso de sucesso', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeDeleteCategoryRequest());
    expect(httpResponse).toEqual(noContent());
  });

  test('Deve retornar 500 se DeleteCategory lancar um erro', async () => {
    const { sut, deleteCategoryStub } = makeSut();
    jest
      .spyOn(deleteCategoryStub, 'delete')
      .mockImplementationOnce(async () => Promise.reject(new Error()));
    const httpResponse = await sut.handle(makeFakeDeleteCategoryRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Deve retornar 400 se Validation lancar um erro', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error());
    const httpResponse: HttpResponse = await sut.handle(makeFakeDeleteCategoryRequest());
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error());
  });
});
