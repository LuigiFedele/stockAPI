import { Validation } from '../../interfaces';
import { RequiredFieldsValidation } from '../../validations/requiredFieldsValidation';
import { ValidationComposite } from '../../validations/validationComposite';

export const createProductValidationCompositeFactory = (): ValidationComposite => {
  const validations: Validation[] = [];

  for (const field of ['name', 'price', 'categoryId']) {
    validations.push(new RequiredFieldsValidation(field));
  }

  return new ValidationComposite(validations);
};
