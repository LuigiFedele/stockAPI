import { StockExit } from '../../../../entities/stockExit';
import { CreateStockExitModel, CreateStockExitRepository } from '../../../../usecases';
import { DbCreateStockExit } from './dbCreateStockExit';

const makeFakeStockExitInput = (): CreateStockExitModel => ({
  productId: 'any_product_id',
  description: 'any_description',
  price_und: 10,
  quantity: 10,
});

const makeFakeStockExitOutput = (): StockExit => ({
  id: 'any_id',
  productId: 'any_product_id',
  description: 'any_description',
  price_und: 10,
  quantity: 10,
});

const makeFakeStockExitRepository = (): CreateStockExitRepository => {
  class StockExitRepositoryStub implements CreateStockExitRepository {
    async create(data: CreateStockExitModel): Promise<StockExit> {
      return Promise.resolve(makeFakeStockExitOutput());
    }
  }
  return new StockExitRepositoryStub();
};

interface SutTypes {
  sut: DbCreateStockExit;
  createStockExitRepositoryStub: CreateStockExitRepository;
}

const makeSut = (): SutTypes => {
  const createStockExitRepositoryStub = makeFakeStockExitRepository();
  const sut = new DbCreateStockExit(createStockExitRepositoryStub);
  return {
    sut,
    createStockExitRepositoryStub,
  };
};

describe('DbCreateStockExit', () => {
  test('Deve chamar CreateStockExitRepository com os valores corretos', async () => {
    const { sut, createStockExitRepositoryStub } = makeSut();
    const createSpy = jest.spyOn(createStockExitRepositoryStub, 'create');
    await sut.create(makeFakeStockExitInput());
    expect(createSpy).toHaveBeenCalledWith(makeFakeStockExitInput());
  });
  test('Deve retornar um produto em caso de sucesso', async () => {
    const { sut } = makeSut();
    const stockExit = await sut.create(makeFakeStockExitInput());
    expect(stockExit).toEqual(makeFakeStockExitOutput());
  });

  test('Deve lancar um erro se CreateStockExitRepository lancar um erro', async () => {
    const { sut, createStockExitRepositoryStub } = makeSut();
    jest
      .spyOn(createStockExitRepositoryStub, 'create')
      .mockImplementationOnce(async () => Promise.reject(new Error()));
    const promise = sut.create(makeFakeStockExitInput());
    await expect(promise).rejects.toThrow();
  });
});
