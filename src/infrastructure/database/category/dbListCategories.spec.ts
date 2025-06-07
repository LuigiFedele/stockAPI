import { Category } from '../../../entities/category';
import { ListCategoriesRepository } from '../../../usecases';
import { DbListCategories } from './dbListCategories';

const makeFakeCategories = (): Category[] => [
  {
    id: 'any_id',
    name: 'any_name',
  },
  {
    id: 'other_id',
    name: 'other_name',
  },
];

const makeListCategoriesRepository = (): ListCategoriesRepository => {
  class ListCategoriesRepositoryStub implements ListCategoriesRepository {
    async list(): Promise<Category[]> {
      return Promise.resolve(makeFakeCategories());
    }
  }
  return new ListCategoriesRepositoryStub();
};

interface SutTypes {
  sut: DbListCategories;
  listCategoriesRepositoryStub: ListCategoriesRepository;
}

const makeSut = (): SutTypes => {
  const listCategoriesRepositoryStub = makeListCategoriesRepository();
  const sut = new DbListCategories(listCategoriesRepositoryStub);
  return {
    sut,
    listCategoriesRepositoryStub,
  };
};

describe('DbListCategories', () => {
  test('Deve chamar ListCategoriesRepository', async () => {
    const { sut, listCategoriesRepositoryStub } = makeSut();
    const listSpy = jest.spyOn(listCategoriesRepositoryStub, 'list');
    await sut.list();
    expect(listSpy).toHaveBeenCalled();
  });

  test('Deve retornar categorias em caso de sucesso', async () => {
    const { sut } = makeSut();
    const categories = await sut.list();
    expect(categories).toEqual(makeFakeCategories());
  });

  test('Deve lançar um erro se ListCategoriesRepository lancar um erro', async () => {
    const { sut, listCategoriesRepositoryStub } = makeSut();
    jest
      .spyOn(listCategoriesRepositoryStub, 'list')
      .mockImplementationOnce(async () => Promise.reject(new Error()));
    const promise = sut.list();
    await expect(promise).rejects.toThrow();
  });
});
