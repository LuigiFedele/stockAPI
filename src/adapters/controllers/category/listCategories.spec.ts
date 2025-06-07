import { Category } from '../../../entities/category';
import { ListCategories } from '../../../usecases';
import { noContent, ok, serverError } from '../../presentations/api/httpResponses/httpResponses';
import { ListCategoriesController } from './listCategories';

interface SutTypes {
  sut: ListCategoriesController;
  listCategoriesStub: ListCategories;
}

const makeListCategories = (): ListCategories => {
  class ListCategoriesStub implements ListCategories {
    async list(): Promise<Category[]> {
      return Promise.resolve(makeFakeCategories());
    }
  }
  return new ListCategoriesStub();
};

const makeSut = (): SutTypes => {
  const listCategoriesStub = makeListCategories();
  const sut = new ListCategoriesController(listCategoriesStub);
  return {
    sut,
    listCategoriesStub,
  };
};

const makeFakeCategories = (): Category[] => {
  return [
    {
      id: 'any_id',
      name: 'any_name',
    },
    {
      id: 'other_id',
      name: 'other_name',
    },
  ];
};

describe('ListCategories Controller', () => {
  test('Deve retornar 204 se a lista estiver vazia', async () => {
    const { sut, listCategoriesStub } = makeSut();
    jest.spyOn(listCategoriesStub, 'list').mockReturnValueOnce(Promise.resolve([]));
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(noContent());
  });

  test('Deve retornar 200 com as categorias', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(ok(makeFakeCategories()));
  });

  test('Deve verificar se a funcionalidade que lista categorias é chamada corretamente', async () => {
    const { sut, listCategoriesStub } = makeSut();
    const listSpy = jest.spyOn(listCategoriesStub, 'list');
    await sut.handle({});
    expect(listSpy).toHaveBeenCalled();
  });

  test('Deve retornar 500 se ListCategories lançar uma exceção', async () => {
    const { sut, listCategoriesStub } = makeSut();
    jest
      .spyOn(listCategoriesStub, 'list')
      .mockImplementationOnce(async () => Promise.reject(new Error()));
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
