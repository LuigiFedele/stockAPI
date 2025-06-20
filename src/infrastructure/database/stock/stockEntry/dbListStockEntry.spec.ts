import { StockEntry } from '../../../../entities/stockEntry';
import { ListStockEntryRepository } from '../../../../usecases';
import { DbListStockEntry } from './dbListStockEntry';

const makeFakeStockEntryOutput = (): StockEntry => ({
  id: 'any_id',
  productId: 'any_product_id',
  description: 'any_description',
  price_und: 10,
  quantity: 10,
});

const makeFakeStockEntryRepository = (): ListStockEntryRepository => {
  class StockEntryRepositoryStub implements ListStockEntryRepository {
    async list(): Promise<StockEntry[]> {
      return Promise.resolve([makeFakeStockEntryOutput()]);
    }
  }
  return new StockEntryRepositoryStub();
};

interface SutTypes {
  sut: DbListStockEntry;
  listStockEntryRepositoryStub: ListStockEntryRepository;
}

const makeSut = (): SutTypes => {
  const listStockEntryRepositoryStub = makeFakeStockEntryRepository();
  const sut = new DbListStockEntry(listStockEntryRepositoryStub);
  return {
    sut,
    listStockEntryRepositoryStub,
  };
};

describe('DbListStockEntry', () => {
  test('Deve chamar ListStockEntryRepository', async () => {
    const { sut, listStockEntryRepositoryStub } = makeSut();
    const listSpy = jest.spyOn(listStockEntryRepositoryStub, 'list');
    await sut.list();
    expect(listSpy).toHaveBeenCalled();
  });

  test('Deve retornar produtos em caso de sucesso', async () => {
    const { sut } = makeSut();
    const products = await sut.list();
    expect(products).toEqual([makeFakeStockEntryOutput()]);
  });

  test('Deve lancar um erro se ListStockEntryRepository lancar um erro', async () => {
    const { sut, listStockEntryRepositoryStub } = makeSut();
    jest
      .spyOn(listStockEntryRepositoryStub, 'list')
      .mockImplementationOnce(async () => Promise.reject(new Error()));
    const promise = sut.list();
    await expect(promise).rejects.toThrow();
  });
});
