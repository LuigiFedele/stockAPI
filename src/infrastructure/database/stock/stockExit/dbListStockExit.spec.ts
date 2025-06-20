import { StockExit } from '../../../../entities/stockExit';
import { ListStockExitRepository } from '../../../../usecases';
import { DbListStockExit } from './dbListStockExit';

const makeFakeStockExitOutput = (): StockExit => ({
  id: 'any_id',
  productId: 'any_product_id',
  description: 'any_description',
  price_und: 10,
  quantity: 10,
});

const makeFakeStockExitRepository = (): ListStockExitRepository => {
  class StockExitRepositoryStub implements ListStockExitRepository {
    async list(): Promise<StockExit[]> {
      return Promise.resolve([makeFakeStockExitOutput()]);
    }
  }
  return new StockExitRepositoryStub();
};

interface SutTypes {
  sut: DbListStockExit;
  listStockExitRepositoryStub: ListStockExitRepository;
}

const makeSut = (): SutTypes => {
  const listStockExitRepositoryStub = makeFakeStockExitRepository();
  const sut = new DbListStockExit(listStockExitRepositoryStub);
  return {
    sut,
    listStockExitRepositoryStub,
  };
};

describe('DbListStockExit', () => {
  test('Deve chamar ListStockExitRepository', async () => {
    const { sut, listStockExitRepositoryStub } = makeSut();
    const listSpy = jest.spyOn(listStockExitRepositoryStub, 'list');
    await sut.list();
    expect(listSpy).toHaveBeenCalled();
  });

  test('Deve retornar produtos em caso de sucesso', async () => {
    const { sut } = makeSut();
    const products = await sut.list();
    expect(products).toEqual([makeFakeStockExitOutput()]);
  });

  test('Deve lancar um erro se ListStockExitRepository lancar um erro', async () => {
    const { sut, listStockExitRepositoryStub } = makeSut();
    jest
      .spyOn(listStockExitRepositoryStub, 'list')
      .mockImplementationOnce(async () => Promise.reject(new Error()));
    const promise = sut.list();
    await expect(promise).rejects.toThrow();
  });
});
