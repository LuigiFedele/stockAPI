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
        price: productData.price,
        quantity: productData.quantity,
        active: productData.active,
        categoryId: productData.categoryId,
      },
    });
    return {
      id: createdProduct.id,
      name: createdProduct.name,
      description: createdProduct.description,
      price: createdProduct.price,
      quantity: createdProduct.quantity,
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
        price: product.price,
        quantity: product.quantity,
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
        price: productData.price,
        quantity: productData.quantity,
        active: productData.active,
        categoryId: productData.categoryId,
      },
    });
  }
}
