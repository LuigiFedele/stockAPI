import { Product } from '../../../entities/product';
import { ListProducts } from '../../../usecases';
import { noContent, ok, serverError } from '../../presentations/api/httpResponses/httpResponses';
import { ListProductsController } from './listProducts';

const makeListProducts = (): ListProducts => {
  class ListProductsStub implements ListProducts {
    async list(): Promise<Product[]> {
      return Promise.resolve(makeFakeProducts());
    }
  }
  return new ListProductsStub();
};

const makeFakeProducts = (): Product[] => {
  return [
    {
      id: 'any_id',
      name: 'any_name',
      description: 'any_description',
      quantity_minimum: 10,
      quantity_supply: 10,
      quantity_maximum: 10,
      active: true,
      categoryId: 'any_category_id',
    },
    {
      id: 'other_id',
      name: 'other_name',
      description: 'other_description',
      quantity_minimum: 20,
      quantity_supply: 20,
      quantity_maximum: 20,
      active: true,
      categoryId: 'other_category_id',
    },
  ];
};

interface SutTypes {
  sut: ListProductsController;
  listProductsStub: ListProducts;
}

const makeSut = (): SutTypes => {
  const listProductsStub = makeListProducts();
  const sut = new ListProductsController(listProductsStub);
  return {
    sut,
    listProductsStub,
  };
};

describe('ListProducts Controller', () => {
  test('Deve retornar 204 se a lista estiver vazia', async () => {
    const { sut, listProductsStub } = makeSut();
    jest.spyOn(listProductsStub, 'list').mockReturnValueOnce(Promise.resolve([]));
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(noContent());
  });

  test('Deve retornar 200 com as categorias', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(ok(makeFakeProducts()));
  });

  test('Deve verificar se a funcionalidade que lista categorias é chamada corretamente', async () => {
    const { sut, listProductsStub } = makeSut();
    const listSpy = jest.spyOn(listProductsStub, 'list');
    await sut.handle({});
    expect(listSpy).toHaveBeenCalled();
  });

  test('Deve retornar 500 se ListCategories lançar uma exceção', async () => {
    const { sut, listProductsStub } = makeSut();
    jest
      .spyOn(listProductsStub, 'list')
      .mockImplementationOnce(async () => Promise.reject(new Error()));
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
