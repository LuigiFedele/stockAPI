import { prisma } from '../../config/PrismaClient';
import { Category } from '../../../entities/category';
import { CreateCategoryModel, CreateCategoryRepository } from '../../../usecases';

export class CategoryPostgresRepository implements CreateCategoryRepository {
  async create(categoryData: CreateCategoryModel): Promise<Category> {
    const createdCategory = await prisma.category.create({
      data: {
        name: categoryData.name,
      },
    });
    return {
      id: createdCategory.id,
      name: createdCategory.name,
    };
  }
}
