import { prisma } from '../../config/PrismaClient';
import { Product } from '../../../entities/product';
import {
  CreateProductModel,
  CreateProductRepository,
  GetProductRepository,
  ListProductsRepository,
  UpdateProductModel,
  UpdateProductRepository,
} from '../../../usecases';

export class ProductPostgresRepository
  implements
    CreateProductRepository,
    GetProductRepository,
    ListProductsRepository,
    UpdateProductRepository
{
  async create(productData: CreateProductModel): Promise<Product> {
    const createdProduct = await prisma.product.create({
      data: {
        name: productData.name,
        description: productData.description,
        quantity_minimum: productData.quantity_minimum,
        quantity_supply: productData.quantity_supply,
        quantity_maximum: productData.quantity_maximum,
        active: productData.active,
        categoryId: productData.categoryId,
      },
    });
    return {
      id: createdProduct.id,
      name: createdProduct.name,
      description: createdProduct.description,
      quantity_minimum: createdProduct.quantity_minimum,
      quantity_supply: createdProduct.quantity_supply,
      quantity_maximum: createdProduct.quantity_maximum,
      active: createdProduct.active,
      categoryId: createdProduct.categoryId,
    };
  }

  async get(productId: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    return product;
  }

  async list(): Promise<Product[]> {
    const products = await prisma.product.findMany();
    const productsFormatted = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        quantity_minimum: product.quantity_minimum,
        quantity_supply: product.quantity_supply,
        quantity_maximum: product.quantity_maximum,
        active: product.active,
        categoryId: product.categoryId,
      };
    });
    return productsFormatted;
  }

  async update(productData: UpdateProductModel): Promise<void> {
    await prisma.product.update({
      where: {
        id: productData.id,
      },
      data: {
        name: productData.name,
        description: productData.description,
        quantity_minimum: productData.quantity_minimum,
        quantity_maximum: productData.quantity_maximum,
        quantity_supply: productData.quantity_supply,
        active: productData.active,
        categoryId: productData.categoryId,
      },
    });
  }
}
