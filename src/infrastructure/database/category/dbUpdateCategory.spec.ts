import { UpdateCategoryRepository, UpdateCategoryModel } from '../../../usecases';
import { DbUpdateCategory } from './dbUpdateCategory';

const makeUpdateCategoryRepositoryStub = (): UpdateCategoryRepository => {
  class UpdateCategoryRepositoryStub implements UpdateCategoryRepository {
    async update(category: UpdateCategoryModel): Promise<void> {}
  }
  return new UpdateCategoryRepositoryStub();
};

interface SutTypes {
  sut: DbUpdateCategory;
  updateCategoryRepositoryStub: UpdateCategoryRepository;
}

const makeSut = (): SutTypes => {
  const updateCategoryRepositoryStub = makeUpdateCategoryRepositoryStub();
  const sut = new DbUpdateCategory(updateCategoryRepositoryStub);
  return {
    sut,
    updateCategoryRepositoryStub,
  };
};

const makeFakeCategory = (): UpdateCategoryModel => ({
  id: 'new_id',
  name: 'new_name',
});

describe('DbUpdateCategory', () => {
  test('Deve chamar UpdateCategoryRepository com os valores corretos', async () => {
    const { sut, updateCategoryRepositoryStub } = makeSut();
    const updateSpy = jest.spyOn(updateCategoryRepositoryStub, 'update');
    await sut.update(makeFakeCategory());
    expect(updateSpy).toHaveBeenCalledWith(makeFakeCategory());
  });

  test('Deve retornar um erro se UpdateCategoryRepository lancar um erro', async () => {
    const { sut, updateCategoryRepositoryStub } = makeSut();
    jest
      .spyOn(updateCategoryRepositoryStub, 'update')
      .mockImplementationOnce(async () => Promise.reject(new Error()));
    const promise = sut.update(makeFakeCategory());
    await expect(promise).rejects.toThrow();
  });
});
