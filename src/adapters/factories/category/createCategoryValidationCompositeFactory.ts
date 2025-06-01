import { Validation } from '../../interfaces/validation';
import { RequiredFieldsValidation } from '../../validations/requiredFieldsValidation';
import { ValidationComposite } from '../../validations/validationComposite';

export const createCateogryValidationCompositeFactory = (): ValidationComposite => {
  const validations: Validation[] = [];

  for (const field of ['name']) {
    validations.push(new RequiredFieldsValidation(field));
  }

  return new ValidationComposite(validations);
};
