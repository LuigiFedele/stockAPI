import { Product } from '../../../entities/product';
import { GetProductRepository } from '../../../usecases';
import { DbGetProduct } from './dbGetProduct';

const makeFakeProduct = (): Product => {
  return {
    id: 'any_id',
    name: 'any_name',
    description: 'any_description',
    quantity_minimum: 10,
    quantity_supply: 10,
    quantity_maximum: 10,
    active: true,
    categoryId: 'any_category_id',
  };
};

const makeGetProductRepository = (): GetProductRepository => {
  class GetProductRepositoryStub implements GetProductRepository {
    async get(): Promise<Product> {
      return Promise.resolve(makeFakeProduct());
    }
  }
  return new GetProductRepositoryStub();
};

interface SutTypes {
  sut: DbGetProduct;
  getProductRepositoryStub: GetProductRepository;
}

const makeSut = (): SutTypes => {
  const getProductRepositoryStub = makeGetProductRepository();
  const sut = new DbGetProduct(getProductRepositoryStub);
  return {
    sut,
    getProductRepositoryStub,
  };
};

describe('DbGetProduct', () => {
  test('Deve chamar GetProductRepository com os valores corretos', async () => {
    const { sut, getProductRepositoryStub } = makeSut();
    const getSpy = jest.spyOn(getProductRepositoryStub, 'get');
    await sut.get('any_id');
    expect(getSpy).toHaveBeenCalledWith('any_id');
  });

  test('Deve retornar um erro se GetProductRepository lancar um erro', async () => {
    const { sut, getProductRepositoryStub } = makeSut();
    jest
      .spyOn(getProductRepositoryStub, 'get')
      .mockImplementationOnce(async () => Promise.reject(new Error()));
    const promise = sut.get('any_id');
    await expect(promise).rejects.toThrow();
  });

  test('Deve retornar um produto em caso de sucesso', async () => {
    const { sut } = makeSut();
    const product = await sut.get('any_id');
    expect(product).toEqual(makeFakeProduct());
  });
});
