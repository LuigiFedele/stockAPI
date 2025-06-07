import { UpdateCategory } from '../../../usecases';
import { HttpRequest, HttpResponse, Validation } from '../../interfaces';
import { noContent, serverError } from '../../presentations/api/httpResponses/httpResponses';
import { UpdateCategoryController } from './updateCategory';

const makeUpdateCategory = (): UpdateCategory => {
  class UpdateCategoryStub implements UpdateCategory {
    async update(categoryData: any): Promise<Error | void> {
      return Promise.resolve();
    }
  }
  return new UpdateCategoryStub();
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
  sut: UpdateCategoryController;
  updateCategoryStub: UpdateCategory;
  validationStub: Validation;
}

const makeSut = (): SutTypes => {
  const updateCategoryStub = makeUpdateCategory();
  const validationStub = makeValidation();
  const sut = new UpdateCategoryController(updateCategoryStub, validationStub);
  return {
    sut,
    updateCategoryStub,
    validationStub,
  };
};

const makeFakeRequest = (): HttpRequest => ({
  body: {
    id: 'valid_id',
    name: 'new_name',
  },
});

describe('UpdateCategory Controller', () => {
  test('Deve retornar 204 em caso de sucesso', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(noContent());
  });

  test('Deve retornar 500 se updateCategory lancar um erro', async () => {
    const { sut, updateCategoryStub } = makeSut();
    jest
      .spyOn(updateCategoryStub, 'update')
      .mockImplementationOnce(async () => Promise.reject(new Error()));
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Deve retornar 400 se Validation lancar um erro', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error());
    const httpResponse: HttpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error());
  });

  test('Deve chamar updateCategory com os valores corretos', async () => {
    const { sut, updateCategoryStub } = makeSut();
    const updateSpy = jest.spyOn(updateCategoryStub, 'update');
    await sut.handle(makeFakeRequest());
    expect(updateSpy).toHaveBeenCalledWith(makeFakeRequest().body);
  });
});
