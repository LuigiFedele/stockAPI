import { Product } from '../../../entities/product';
import { CreateProductModel, CreateProductRepository } from '../../../usecases';
import { DbCreateProduct } from './dbCreateProduct';

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

const makeCreateProductRepository = (): CreateProductRepository => {
  class CreateProductRepositoryStub implements CreateProductRepository {
    async create(product: CreateProductModel): Promise<Product> {
      return Promise.resolve(makeFakeProduct());
    }
  }
  return new CreateProductRepositoryStub();
};

interface SutTypes {
  sut: DbCreateProduct;
  createProductRepositoryStub: CreateProductRepository;
}

const makeSut = (): SutTypes => {
  const createProductRepositoryStub = makeCreateProductRepository();
  const sut = new DbCreateProduct(createProductRepositoryStub);
  return {
    sut,
    createProductRepositoryStub,
  };
};

describe('DbCreateProduct', () => {
  test('Deve chamar CreateProductRepository com os valores corretos', async () => {
    const { sut, createProductRepositoryStub } = makeSut();
    const createSpy = jest.spyOn(createProductRepositoryStub, 'create');
    await sut.create(makeFakeProduct());
    expect(createSpy).toHaveBeenCalledWith(makeFakeProduct());
  });

  test('Deve retornar um produto em caso de sucesso', async () => {
    const { sut } = makeSut();
    const product = await sut.create(makeFakeProduct());
    expect(product).toEqual(makeFakeProduct());
  });

  test('Deve lancar um erro se CreateProductRepository lancar um erro', async () => {
    const { sut, createProductRepositoryStub } = makeSut();
    jest
      .spyOn(createProductRepositoryStub, 'create')
      .mockImplementationOnce(async () => Promise.reject(new Error()));
    const promise = sut.create(makeFakeProduct());
    await expect(promise).rejects.toThrow();
  });
});
