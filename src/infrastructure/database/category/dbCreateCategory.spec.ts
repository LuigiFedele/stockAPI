import { Category } from '../../../entities/category';
import { CreateCategoryRepository, CreateCategoryModel } from '../../../usecases';
import { DbCreateCategory } from './dbCreateCategory';

const makeFakeCategories = (): Category => {
  return {
    id: 'any_id',
    name: 'any_name',
  };
};

const makeCreateCategoryRepository = (): CreateCategoryRepository => {
  class CreateCategoryRepositoryStub implements CreateCategoryRepository {
    async create(category: CreateCategoryModel): Promise<Category> {
      return Promise.resolve(makeFakeCategories());
    }
  }
  return new CreateCategoryRepositoryStub();
};

interface SutTypes {
  sut: DbCreateCategory;
  createCategoryRepositoryStub: CreateCategoryRepository;
}

const makeSut = (): SutTypes => {
  const createCategoryRepositoryStub = makeCreateCategoryRepository();
  const sut = new DbCreateCategory(createCategoryRepositoryStub);
  return {
    sut,
    createCategoryRepositoryStub,
  };
};

describe('DbCreateCategory', () => {
  test('Deve chamar CreateCategoryRepository com os valores corretos', async () => {
    const { sut, createCategoryRepositoryStub } = makeSut();
    const createSpy = jest.spyOn(createCategoryRepositoryStub, 'create');
    await sut.create({
      name: 'any_name',
    });
    expect(createSpy).toHaveBeenCalledWith({
      name: 'any_name',
    });
  });

  test('Deve retornar uma categoria em caso de sucesso', async () => {
    const { sut } = makeSut();
    const category = await sut.create({
      name: 'any_name',
    });
    expect(category).toEqual(makeFakeCategories());
  });

  test('Deve lancar um erro se CreateCategoryRepository lancar um erro', async () => {
    const { sut, createCategoryRepositoryStub } = makeSut();
    jest
      .spyOn(createCategoryRepositoryStub, 'create')
      .mockImplementationOnce(async () => Promise.reject(new Error()));
    const promise = sut.create({
      name: 'any_name',
    });
    await expect(promise).rejects.toThrow();
  });
});
