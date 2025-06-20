import { prisma } from '../../../config/PrismaClient';
import { StockExit } from '../../../../entities/stockExit';
import {
  CreateStockExitModel,
  CreateStockExitRepository,
  ListStockExitRepository,
} from '../../../../usecases';

export class StockExitPostgresRepository
  implements CreateStockExitRepository, ListStockExitRepository
{
  async create(data: CreateStockExitModel): Promise<StockExit> {
    const createdExit = await prisma.stockExit.create({
      data: {
        productId: data.productId,
        description: data.description,
        price_und: data.price_und,
        quantity: data.quantity,
      },
    });

    return {
      id: createdExit.id,
      productId: createdExit.productId,
      description: createdExit.description,
      price_und: createdExit.price_und.toNumber(),
      quantity: createdExit.quantity,
    };
  }

  async list(): Promise<StockExit[]> {
    const entries = await prisma.stockExit.findMany();
    const entriesFormatted = entries.map((exit) => {
      return {
        id: exit.id,
        productId: exit.productId,
        description: exit.description,
        price_und: exit.price_und.toNumber(),
        quantity: exit.quantity,
      };
    });
    return entriesFormatted;
  }
}
