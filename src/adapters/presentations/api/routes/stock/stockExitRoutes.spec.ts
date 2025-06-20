import request from 'supertest';
import app from '../../config/app';
import { prisma } from '../../../../../infrastructure/config/PrismaClient';

describe('Stock Exit Routes', () => {
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

  const makeStockExit = async () => {
    return await prisma.stockExit.create({
      data: {
        productId,
        description: 'any description',
        price_und: 10,
        quantity: 10,
      },
    });
  };

  test('Deve retornar 201 ao criar uma saídas de estoque', async () => {
    const response = await request(app).post('/api/exits').send({
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
    const response = await request(app).post('/api/exits').send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  test('Deve retornar 204 se não houver saídas de estoque', async () => {
    const response = await request(app).get('/api/exits');
    expect(response.status).toBe(204);
  });

  test('Deve retornar 200 e uma lista de saídas de estoque', async () => {
    await makeStockExit();

    const response = await request(app).get('/api/exits');

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
