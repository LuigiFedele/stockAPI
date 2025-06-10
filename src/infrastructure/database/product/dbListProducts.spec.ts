import { Product } from '../../../entities/product';
import { ListProductsRepository } from '../../../usecases';
import { DbListProducts } from './dbListProducts';

const makeFakeProducts = (): Product[] => {
  const products: Product[] = [];
  for (let i = 0; i < 3; i++) {
    products.push({
      id: 'any_id',
      name: 'any_name',
      description: 'any_description',
      price: 10,
      quantity: 10,
      active: false,
      categoryId: 'any_category_id',
    });
  }
  return products;
};

const makeListProductsRepository = (): ListProductsRepository => {
  class ListProductsRepositoryStub implements ListProductsRepository {
    async list(): Promise<Product[]> {
      return Promise.resolve(makeFakeProducts());
    }
  }
  return new ListProductsRepositoryStub();
};

interface SutTypes {
  sut: DbListProducts;
  listProductsRepositoryStub: ListProductsRepository;
}

const makeSut = (): SutTypes => {
  const listProductsRepositoryStub = makeListProductsRepository();
  const sut = new DbListProducts(listProductsRepositoryStub);
  return {
    sut,
    listProductsRepositoryStub,
  };
};

describe('DbListProducts', () => {
  test('Deve chamar ListProductsRepository', async () => {
    const { sut, listProductsRepositoryStub } = makeSut();
    const listSpy = jest.spyOn(listProductsRepositoryStub, 'list');
    await sut.list();
    expect(listSpy).toHaveBeenCalled();
  });

  test('Deve retornar produtos em caso de sucesso', async () => {
    const { sut } = makeSut();
    const products = await sut.list();
    expect(products).toEqual(makeFakeProducts());
  });

  test('Deve lancar um erro se ListProductsRepository lancar um erro', async () => {
    const { sut, listProductsRepositoryStub } = makeSut();
    jest
      .spyOn(listProductsRepositoryStub, 'list')
      .mockImplementationOnce(async () => Promise.reject(new Error()));
    const promise = sut.list();
    await expect(promise).rejects.toThrow();
  });
});
