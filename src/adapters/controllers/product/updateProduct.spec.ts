import { UpdateProduct, UpdateProductModel } from '../../../usecases';
import { HttpRequest, HttpResponse, Validation } from '../../interfaces';
import { noContent, serverError } from '../../presentations/api/httpResponses/httpResponses';
import { UpdateProductController } from './updateProduct';

const makeUpdateProduct = (): UpdateProduct => {
  class UpdateProductStub implements UpdateProduct {
    async update(productData: UpdateProductModel): Promise<Error | void> {
      return Promise.resolve();
    }
  }
  return new UpdateProductStub();
};

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error | undefined {
      return;
    }
  }
  return new ValidationStub();
};

interface sutTypes {
  sut: UpdateProductController;
  updateProductStub: UpdateProduct;
  validationStub: Validation;
}

const makeSut = (): sutTypes => {
  const updateProductStub = makeUpdateProduct();
  const validationStub = makeValidation();
  const sut = new UpdateProductController(updateProductStub, validationStub);
  return {
    sut,
    updateProductStub,
    validationStub,
  };
};

const makeFakeRequest = (): HttpRequest => ({
  body: {
    id: 'any_id',
    name: 'any_name',
    description: 'any_description',
    price: 10,
    quantity: 10,
    active: true,
    categoryId: 'any_category_id',
  },
});

describe('UpdateProduct Controller', () => {
  test('Deve retornar 204 em caso de sucesso', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(noContent());
  });

  test('Deve retornar 500 se updateProduct lancar um erro', async () => {
    const { sut, updateProductStub } = makeSut();
    jest
      .spyOn(updateProductStub, 'update')
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

  test('Deve chamar updateProduct com os valores corretos', async () => {
    const { sut, updateProductStub } = makeSut();
    const updateSpy = jest.spyOn(updateProductStub, 'update');
    await sut.handle(makeFakeRequest());
    expect(updateSpy).toHaveBeenCalledWith(makeFakeRequest().body);
  });
});
