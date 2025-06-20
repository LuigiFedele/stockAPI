import { prisma } from '../../../config/PrismaClient';
import { StockEntry } from '../../../../entities/stockEntry';
import {
  CreateStockEntryModel,
  CreateStockEntryRepository,
  ListStockEntryRepository,
} from '../../../../usecases';

export class StockEntryPostgresRepository
  implements CreateStockEntryRepository, ListStockEntryRepository
{
  async create(data: CreateStockEntryModel): Promise<StockEntry> {
    const createdEntry = await prisma.stockEntry.create({
      data: {
        productId: data.productId,
        description: data.description,
        price_und: data.price_und,
        quantity: data.quantity,
      },
    });

    return {
      id: createdEntry.id,
      productId: createdEntry.productId,
      description: createdEntry.description,
      price_und: createdEntry.price_und.toNumber(),
      quantity: createdEntry.quantity,
    };
  }

  async list(): Promise<StockEntry[]> {
    const entries = await prisma.stockEntry.findMany();
    const entriesFormatted = entries.map((entry) => {
      return {
        id: entry.id,
        productId: entry.productId,
        description: entry.description,
        price_und: entry.price_und.toNumber(),
        quantity: entry.quantity,
        entryDate: entry.entryDate,
      };
    });
    return entriesFormatted;
  }
}
