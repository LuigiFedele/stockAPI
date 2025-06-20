import { StockEntry } from '../../../../entities/stockEntry';
import { CreateStockEntryModel, CreateStockEntryRepository } from '../../../../usecases';
import { DbCreateStockEntry } from './dbCreateStockEntry';

const makeFakeStockEntryInput = (): CreateStockEntryModel => ({
  productId: 'any_product_id',
  description: 'any_description',
  price_und: 10,
  quantity: 10,
});

const makeFakeStockEntryOutput = (): StockEntry => ({
  id: 'any_id',
  productId: 'any_product_id',
  description: 'any_description',
  price_und: 10,
  quantity: 10,
});

const makeFakeStockEntryRepository = (): CreateStockEntryRepository => {
  class StockEntryRepositoryStub implements CreateStockEntryRepository {
    async create(data: CreateStockEntryModel): Promise<StockEntry> {
      return Promise.resolve(makeFakeStockEntryOutput());
    }
  }
  return new StockEntryRepositoryStub();
};

interface SutTypes {
  sut: DbCreateStockEntry;
  createStockEntryRepositoryStub: CreateStockEntryRepository;
}

const makeSut = (): SutTypes => {
  const createStockEntryRepositoryStub = makeFakeStockEntryRepository();
  const sut = new DbCreateStockEntry(createStockEntryRepositoryStub);
  return {
    sut,
    createStockEntryRepositoryStub,
  };
};

describe('DbCreateStockEntry', () => {
  test('Deve chamar CreateStockEntryRepository com os valores corretos', async () => {
    const { sut, createStockEntryRepositoryStub } = makeSut();
    const createSpy = jest.spyOn(createStockEntryRepositoryStub, 'create');
    await sut.create(makeFakeStockEntryInput());
    expect(createSpy).toHaveBeenCalledWith(makeFakeStockEntryInput());
  });
  test('Deve retornar um produto em caso de sucesso', async () => {
    const { sut } = makeSut();
    const stockEntry = await sut.create(makeFakeStockEntryInput());
    expect(stockEntry).toEqual(makeFakeStockEntryOutput());
  });

  test('Deve lancar um erro se CreateStockEntryRepository lancar um erro', async () => {
    const { sut, createStockEntryRepositoryStub } = makeSut();
    jest
      .spyOn(createStockEntryRepositoryStub, 'create')
      .mockImplementationOnce(async () => Promise.reject(new Error()));
    const promise = sut.create(makeFakeStockEntryInput());
    await expect(promise).rejects.toThrow();
  });
});
