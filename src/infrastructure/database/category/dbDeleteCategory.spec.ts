import { DeleteCategory, DeleteCategoryModel, DeleteCategoryRepository } from '../../../usecases';
import { DbDeleteCategory } from './dbDeleteCategory';

const makeDeleteCategoryRepository = (): DeleteCategoryRepository => {
  class DeleteCategoryRepositoryStub implements DeleteCategoryRepository {
    async delete(category: DeleteCategoryModel): Promise<void> {}
  }
  return new DeleteCategoryRepositoryStub();
};

const makeDeleteCategory = (): DeleteCategory => {
  class DeleteCategoryStub implements DeleteCategory {
    async delete(category: DeleteCategoryModel): Promise<Error | void> {
      return Promise.resolve();
    }
  }
  return new DeleteCategoryStub();
};

const makeFakeDeleteCategory = (): any => ({
  id: 'any_id',
  name: 'any_name',
});

interface SutTypes {
  sut: DbDeleteCategory;
  deleteCategoryRepositoryStub: DeleteCategoryRepository;
}

const makeSut = (): SutTypes => {
  const deleteCategoryRepositoryStub = makeDeleteCategoryRepository();
  const sut = new DbDeleteCategory(deleteCategoryRepositoryStub);
  return {
    sut,
    deleteCategoryRepositoryStub,
  };
};

describe('DbDeleteCategory', () => {
  test('Deve chamar DeleteCategoryRepository com os valores corretos', async () => {
    const { sut, deleteCategoryRepositoryStub } = makeSut();
    const deleteSpy = jest.spyOn(deleteCategoryRepositoryStub, 'delete');
    await sut.delete(makeFakeDeleteCategory());
    expect(deleteSpy).toHaveBeenCalledWith(makeFakeDeleteCategory());
  });

  test('Deve retornar um erro se DeleteCategoryRepository lancar um erro', async () => {
    const { sut, deleteCategoryRepositoryStub } = makeSut();
    jest
      .spyOn(deleteCategoryRepositoryStub, 'delete')
      .mockImplementationOnce(async () => Promise.reject(new Error()));
    const promise = sut.delete(makeFakeDeleteCategory());
    await expect(promise).rejects.toThrow();
  });
});
