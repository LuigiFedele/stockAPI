import { Validation } from '../../../interfaces';
import { RequiredFieldsValidation } from '../../../validations/requiredFieldsValidation';
import { ValidationComposite } from '../../../validations/validationComposite';

export const createStockEntryValidationControllerFactory = (): Validation => {
  const validations: Validation[] = [];

  for (const field of ['productId', 'quantity']) {
    validations.push(new RequiredFieldsValidation(field));
  }

  return new ValidationComposite(validations);
};
