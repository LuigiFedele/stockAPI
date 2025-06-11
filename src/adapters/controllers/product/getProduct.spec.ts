import { Product } from '../../../entities/product';
import { GetProduct } from '../../../usecases';
import { noContent, ok, serverError } from '../../presentations/api/httpResponses/httpResponses';
import { GetProductController } from './getProduct';
import { HttpRequest } from '../../interfaces';

interface SutTypes {
  sut: GetProductController;
  getProductStub: GetProduct;
}

const makeFakeProduct = (): Product => ({
  id: 'any_id',
  name: 'any_name',
  description: 'any_description',
  quantity_minimum: 10,
  quantity_supply: 10,
  quantity_maximum: 10,
  active: true,
  categoryId: 'any_category_id',
});

const makeGetProduct = (): GetProduct => {
  class GetProductStub implements GetProduct {
    async get(productId: string): Promise<Product | null> {
      return makeFakeProduct();
    }
  }
  return new GetProductStub();
};

const makeSut = (): SutTypes => {
  const getProductStub = makeGetProduct();
  const sut = new GetProductController(getProductStub);
  return {
    sut,
    getProductStub,
  };
};

describe('GetProductController', () => {
  test('Deve retornar 200 com o produto', async () => {
    const { sut } = makeSut();
    const httpRequest: HttpRequest = { params: { id: 'any_id' } };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(ok(makeFakeProduct()));
  });

  test('Deve retornar 204 se o produto nao existir', async () => {
    const { sut, getProductStub } = makeSut();
    jest.spyOn(getProductStub, 'get').mockResolvedValueOnce(null);
    const httpRequest: HttpRequest = { params: { id: 'any_id' } };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(noContent());
  });

  test('Deve retornar 500 se GetProduct lançar exceção', async () => {
    const { sut, getProductStub } = makeSut();
    jest.spyOn(getProductStub, 'get').mockRejectedValueOnce(new Error());
    const httpRequest: HttpRequest = { params: { id: 'any_id' } };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Deve chamar GetProduct com os valores corretos', async () => {
    const { sut, getProductStub } = makeSut();
    const getSpy = jest.spyOn(getProductStub, 'get');
    const httpRequest: HttpRequest = { params: { id: 'any_id' } };
    await sut.handle(httpRequest);
    expect(getSpy).toHaveBeenCalledWith('any_id');
  });
});
