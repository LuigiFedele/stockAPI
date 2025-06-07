import { prisma } from '../../config/PrismaClient';
import { Category } from '../../../entities/category';
import {
  CreateCategoryModel,
  CreateCategoryRepository,
  ListCategoriesRepository,
  UpdateCategoryModel,
  UpdateCategoryRepository,
  DeleteCategoryModel,
  DeleteCategoryRepository,
} from '../../../usecases';

export class CategoryPostgresRepository
  implements
    CreateCategoryRepository,
    ListCategoriesRepository,
    UpdateCategoryRepository,
    DeleteCategoryRepository
{
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

  async list(): Promise<Category[]> {
    const categories = await prisma.category.findMany();
    const categoriesFormatted = categories.map((category) => {
      return {
        id: category.id,
        name: category.name,
      };
    });
    return categoriesFormatted;
  }

  async update(categoryData: UpdateCategoryModel): Promise<void> {
    await prisma.category.update({
      where: {
        id: categoryData.id,
      },
      data: {
        name: categoryData.name,
      },
    });
  }

  async delete(categoryData: DeleteCategoryModel): Promise<void> {
    await prisma.category.delete({
      where: {
        id: categoryData.id,
      },
    });
  }
}
