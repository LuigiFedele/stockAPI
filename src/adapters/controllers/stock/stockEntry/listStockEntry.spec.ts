import { StockEntry } from '../../../../entities/stockEntry';
import { ListStockEntry } from '../../../../usecases';
import { noContent, ok, serverError } from '../../../presentations/api/httpResponses/httpResponses';
import { ListStockEntryController } from './listStockEntry';

const makeListStockEntries = (): ListStockEntry => {
  class ListStockEntriesStub implements ListStockEntry {
    async list(): Promise<StockEntry[]> {
      return Promise.resolve(makeFakeStockEntries());
    }
  }
  return new ListStockEntriesStub();
};

const makeFakeStockEntries = (): StockEntry[] => {
  return [
    {
      id: 'any_id',
      productId: 'any_productId',
      description: 'any-description',
      price_und: 10,
      quantity: 10,
    },
  ];
};

const makeSut = () => {
  const listStockEntryStub = makeListStockEntries();
  const sut = new ListStockEntryController(listStockEntryStub);
  return {
    sut,
    listStockEntryStub,
  };
};

interface SutTypes {
  sut: ListStockEntryController;
  listStockEntryStub: ListStockEntry;
}

describe('ListStockEntry Controller', () => {
  test('Deve retornar 204 se a lista estiver vazia', async () => {
    const { sut, listStockEntryStub } = makeSut();
    jest.spyOn(listStockEntryStub, 'list').mockReturnValueOnce(Promise.resolve([]));
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(noContent());
  });

  test('Deve retornar 200 com as categorias', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(ok(makeFakeStockEntries()));
  });

  test('Deve verificar se a funcionalidade que lista categorias é chamada corretamente', async () => {
    const { sut, listStockEntryStub } = makeSut();
    const listSpy = jest.spyOn(listStockEntryStub, 'list');
    await sut.handle({});
    expect(listSpy).toHaveBeenCalled();
  });

  test('Deve retornar 500 se ListCategories lançar uma exceção', async () => {
    const { sut, listStockEntryStub } = makeSut();
    jest
      .spyOn(listStockEntryStub, 'list')
      .mockImplementationOnce(async () => Promise.reject(new Error()));
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
