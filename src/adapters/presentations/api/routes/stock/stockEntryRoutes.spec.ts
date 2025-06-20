import request from 'supertest';
import app from '../../config/app';
import { prisma } from '../../../../../infrastructure/config/PrismaClient';

describe('Stock Entry Routes', () => {
  let productId: string;

  beforeEach(async () => {
    await prisma.$transaction([
      prisma.stockExit.deleteMany(),
      prisma.stockEntry.deleteMany(),
      prisma.product.deleteMany(),
      prisma.category.deleteMany(),
    ]);

    const category = await prisma.category.create({
      data: { name: 'test' },
    });

    const product = await prisma.product.create({
      data: {
        name: 'product_test',
        description: 'any description',
        quantity_minimum: 10,
        quantity_supply: 10,
        quantity_maximum: 10,
        active: true,
        categoryId: category.id,
      },
    });

    productId = product.id;
  });

  const makeStockEntry = async () => {
    return await prisma.stockEntry.create({
      data: {
        productId,
        description: 'any description',
        price_und: 10,
        quantity: 10,
      },
    });
  };

  test('Deve retornar 201 ao criar uma entrada de estoque', async () => {
    const response = await request(app).post('/api/entries').send({
      productId,
      description: 'any description',
      price_und: 10,
      quantity: 10,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.description).toBe('any description');
    expect(response.body.price_und).toBe(10);
    expect(response.body.quantity).toBe(10);
  });

  test('Deve retornar 400 se dados obrigatórios forem omitidos', async () => {
    const response = await request(app).post('/api/entries').send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  test('Deve retornar 204 se não houver entradas de estoque', async () => {
    const response = await request(app).get('/api/entries');
    expect(response.status).toBe(204);
  });

  test('Deve retornar 200 e uma lista de entradas de estoque', async () => {
    await makeStockEntry();

    const response = await request(app).get('/api/entries');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0].productId).toBe(productId);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});
