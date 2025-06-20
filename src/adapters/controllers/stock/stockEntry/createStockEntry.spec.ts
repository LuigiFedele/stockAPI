import { StockEntry } from '../../../../entities/stockEntry';
import { CreateStockEntry, CreateStockEntryModel } from '../../../../usecases';
import { HttpRequest, Validation } from '../../../interfaces';
import { serverError } from '../../../presentations/api/httpResponses/httpResponses';
import { CreateStockEntryController } from './createStockEntry';

const makeCreateStockEntry = (): CreateStockEntry => {
  class CreateStockEntryStub implements CreateStockEntry {
    async create(dataEntry: CreateStockEntryModel): Promise<StockEntry> {
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
  return new CreateStockEntryStub();
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
  sut: CreateStockEntryController;
  createStockEntryStub: CreateStockEntry;
  validationStub: Validation;
}

const makeSut = (): SutTypes => {
  const createStockEntryStub = makeCreateStockEntry();
  const validationStub = makeValidation();
  const sut = new CreateStockEntryController(createStockEntryStub, validationStub);
  return {
    sut,
    createStockEntryStub,
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

describe('CreateStockEntry Controller', () => {
  test('Deve retornar 500 se createStockEntry lançar uma exceção', async () => {
    const { sut, createStockEntryStub } = makeSut();
    jest
      .spyOn(createStockEntryStub, 'create')
      .mockImplementationOnce(async () => Promise.reject(new Error()));
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Deve chamar createStockEntry com os valores corretos', async () => {
    const { sut, createStockEntryStub } = makeSut();
    const createSpy = jest.spyOn(createStockEntryStub, 'create');
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
