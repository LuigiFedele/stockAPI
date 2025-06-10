import { Product } from '../../../entities/product';
import { CreateProduct, CreateCategoryModel } from '../../../usecases';
import { HttpRequest, Validation } from '../../interfaces';
import { serverError } from '../../presentations/api/httpResponses/httpResponses';
import { CreateProductController } from './createProduct';

const makeCreateProduct = (): CreateProduct => {
  class CreateProductStub implements CreateProduct {
    async create(product: CreateCategoryModel): Promise<Product> {
      return new Promise((resolve) =>
        resolve({
          id: 'any_id',
          name: 'any_name',
          description: 'any_description',
          price: 10,
          quantity: 10,
          active: true,
          categoryId: 'any_category_id',
        }),
      );
    }
  }
  return new CreateProductStub();
};

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(data: any): Error | void {
      return;
    }
  }
  return new ValidationStub();
};

interface SutTypes {
  sut: CreateProductController;
  createProductStub: CreateProduct;
  validationStub: Validation;
}
const makeSut = (): SutTypes => {
  const createProductStub = makeCreateProduct();
  const validationStub = makeValidation();
  const sut = new CreateProductController(createProductStub, validationStub);
  return {
    sut,
    createProductStub,
    validationStub,
  };
};

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    description: 'any_description',
    price: 10,
    quantity: 10,
    active: true,
    categoryId: 'any_category_id',
  },
});

describe('CreateProduct Controller', () => {
  test('Deve retornar 500 se createProduct lançar uma exceção', async () => {
    const { sut, createProductStub } = makeSut();
    jest
      .spyOn(createProductStub, 'create')
      .mockImplementationOnce(async () => Promise.reject(new Error()));
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Deve chamar createProduct com os valores corretos', async () => {
    const { sut, createProductStub } = makeSut();
    const createSpy = jest.spyOn(createProductStub, 'create');
    await sut.handle(makeFakeRequest());
    expect(createSpy).toHaveBeenCalledWith({
      name: 'any_name',
      description: 'any_description',
      price: 10,
      quantity: 10,
      active: true,
      categoryId: 'any_category_id',
    });
  });

  test('Deve chamar Validation com os valores corretos', async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    await sut.handle(makeFakeRequest());
    expect(validateSpy).toHaveBeenCalledWith(makeFakeRequest().body);
  });
});
