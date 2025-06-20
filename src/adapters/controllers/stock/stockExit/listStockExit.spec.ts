import { StockExit } from '../../../../entities/stockExit';
import { ListStockExit } from '../../../../usecases';
import { noContent, ok, serverError } from '../../../presentations/api/httpResponses/httpResponses';
import { ListStockExitController } from './listStockExit';

const makeListStockEntries = (): ListStockExit => {
  class ListStockEntriesStub implements ListStockExit {
    async list(): Promise<StockExit[]> {
      return Promise.resolve(makeFakeStockEntries());
    }
  }
  return new ListStockEntriesStub();
};

const makeFakeStockEntries = (): StockExit[] => {
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
  const listStockExitStub = makeListStockEntries();
  const sut = new ListStockExitController(listStockExitStub);
  return {
    sut,
    listStockExitStub,
  };
};

interface SutTypes {
  sut: ListStockExitController;
  listStockExitStub: ListStockExit;
}

describe('ListStockExit Controller', () => {
  test('Deve retornar 204 se a lista estiver vazia', async () => {
    const { sut, listStockExitStub } = makeSut();
    jest.spyOn(listStockExitStub, 'list').mockReturnValueOnce(Promise.resolve([]));
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(noContent());
  });

  test('Deve retornar 200 com as categorias', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(ok(makeFakeStockEntries()));
  });

  test('Deve verificar se a funcionalidade que lista categorias é chamada corretamente', async () => {
    const { sut, listStockExitStub } = makeSut();
    const listSpy = jest.spyOn(listStockExitStub, 'list');
    await sut.handle({});
    expect(listSpy).toHaveBeenCalled();
  });

  test('Deve retornar 500 se ListCategories lançar uma exceção', async () => {
    const { sut, listStockExitStub } = makeSut();
    jest
      .spyOn(listStockExitStub, 'list')
      .mockImplementationOnce(async () => Promise.reject(new Error()));
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
