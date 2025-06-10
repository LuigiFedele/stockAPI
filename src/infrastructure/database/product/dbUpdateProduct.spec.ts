import { UpdateProductModel, UpdateProductRepository } from '../../../usecases';
import { DbUpdateProduct } from './dbUpdateProduct';

const makeUpdateProductRepository = (): UpdateProductRepository => {
  class UpdateProductRepositoryStub implements UpdateProductRepository {
    async update(product: UpdateProductModel): Promise<Error | void> {}
  }
  return new UpdateProductRepositoryStub();
};

interface SutTypes {
  sut: DbUpdateProduct;
  updateProductRepositoryStub: UpdateProductRepository;
}

const makeSut = (): SutTypes => {
  const updateProductRepositoryStub = makeUpdateProductRepository();
  const sut = new DbUpdateProduct(updateProductRepositoryStub);
  return {
    sut,
    updateProductRepositoryStub,
  };
};

const makeFakeProduct = (): UpdateProductModel => ({
  id: '1',
  name: 'any_name',
  description: 'any_description',
  price: 10,
  categoryId: '1',
});

describe('DbUpdateProduct', () => {
  test('Deve chamar UpdateProductRepository com os valores corretos', async () => {
    const { sut, updateProductRepositoryStub } = makeSut();
    const updateSpy = jest.spyOn(updateProductRepositoryStub, 'update');
    await sut.update(makeFakeProduct());
    expect(updateSpy).toHaveBeenCalledWith(makeFakeProduct());
  });

  test('Deve retornar um erro se UpdateProductRepository lancar um erro', async () => {
    const { sut, updateProductRepositoryStub } = makeSut();
    jest
      .spyOn(updateProductRepositoryStub, 'update')
      .mockImplementationOnce(async () => Promise.reject(new Error()));
    const promise = sut.update(makeFakeProduct());
    await expect(promise).rejects.toThrow();
  });
});
