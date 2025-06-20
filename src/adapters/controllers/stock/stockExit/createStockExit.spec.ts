import { StockExit } from '../../../../entities/stockExit';
import { CreateStockExit, CreateStockExitModel } from '../../../../usecases';
import { HttpRequest, Validation } from '../../../interfaces';
import { serverError } from '../../../presentations/api/httpResponses/httpResponses';
import { CreateStockExitController } from './createStockExit';

const makeCreateStockExit = (): CreateStockExit => {
  class CreateStockExitStub implements CreateStockExit {
    async create(dataExit: CreateStockExitModel): Promise<StockExit> {
      return new Promise((resolve) =>
        resolve({
          id: 'any_id',
          productId: 'any_productId',
          description: 'any-description',
          price_und: 10,
          quantity: 10,
        }),
      );
    }
  }
  return new CreateStockExitStub();
};

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(data: any): void | Error {
      return;
    }
  }
  return new ValidationStub();
};

interface SutTypes {
  sut: CreateStockExitController;
  createStockExitStub: CreateStockExit;
  validationStub: Validation;
}

const makeSut = (): SutTypes => {
  const createStockExitStub = makeCreateStockExit();
  const validationStub = makeValidation();
  const sut = new CreateStockExitController(createStockExitStub, validationStub);
  return {
    sut,
    createStockExitStub,
    validationStub,
  };
};

const makeFakeRequest = (): HttpRequest => ({
  body: {
    productId: 'any_productId',
    description: 'any_description',
    price_und: 10,
    quantity: 10,
  },
});

describe('CreateStockExit Controller', () => {
  test('Deve retornar 500 se createStockExit lançar uma exceção', async () => {
    const { sut, createStockExitStub } = makeSut();
    jest
      .spyOn(createStockExitStub, 'create')
      .mockImplementationOnce(async () => Promise.reject(new Error()));
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Deve chamar createStockExit com os valores corretos', async () => {
    const { sut, createStockExitStub } = makeSut();
    const createSpy = jest.spyOn(createStockExitStub, 'create');
    await sut.handle(makeFakeRequest());
    expect(createSpy).toHaveBeenCalledWith({
      productId: 'any_productId',
      description: 'any_description',
      price_und: 10,
      quantity: 10,
    });
  });

  test('Deve chamar Validation com os valores corretos', async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    await sut.handle(makeFakeRequest());
    expect(validateSpy).toHaveBeenCalledWith(makeFakeRequest().body);
  });
});
