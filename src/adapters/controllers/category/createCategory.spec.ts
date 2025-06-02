/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Category } from '../../../entities/category';
import { CreateCategory, CreateCategoryModel } from '../../../usecases';
import { HttpRequest, Validation } from '../../interfaces';
import { serverError } from '../../presentations/api/httpResponses/httpResponses';
import { CreateCategoryController } from './createCategory';

const makeCreateCategory = (): CreateCategory => {
  class CreateCategoryStub implements CreateCategory {
    async create(category: CreateCategoryModel): Promise<Category> {
      return Promise.resolve({
        id: 'any_id',
        name: 'any_name',
      });
    }
  }

  return new CreateCategoryStub();
};

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(data: any): Error | void {
      return;
    }
  }
  return new ValidationStub();
};

interface SutTypes {
  sut: CreateCategoryController;
  createCategoryStub: CreateCategory;
  validationStub: Validation;
}

const makeSut = (): SutTypes => {
  const createCategoryStub = makeCreateCategory();
  const validationStub = makeValidation();
  const sut = new CreateCategoryController(createCategoryStub, validationStub);
  return {
    sut,
    createCategoryStub,
    validationStub,
  };
};

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
  },
});

describe('CreateCategory Controller', () => {
  test('Deve chamar CreateCategory com valores corretos', async () => {
    const { sut, createCategoryStub } = makeSut();

    const createSpy = jest.spyOn(createCategoryStub, 'create');

    await sut.handle(makeFakeRequest());

    expect(createSpy).toHaveBeenCalledWith({
      name: 'any_name',
    });
  });
});

test('Deve retornar 500 se CreateCategory lançar uma exceção', async () => {
  const { sut, createCategoryStub } = makeSut();

  jest
    .spyOn(createCategoryStub, 'create')
    .mockImplementationOnce(async () => Promise.reject(new Error()));

  const httpResponse = await sut.handle(makeFakeRequest());
  expect(httpResponse).toEqual(serverError(new Error()));
});

test('Deve chamar Validation com valores corretos', async () => {
  const { sut, validationStub } = makeSut();

  const validateSpy = jest.spyOn(validationStub, 'validate');
  const httpRequest = makeFakeRequest();
  await sut.handle(httpRequest);

  expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
});
