import request from 'supertest';
import app from '../../config/app';
import { prisma } from '../../../../../infrastructure/config/PrismaClient';

describe('Product Routes', () => {
  let categoryId: string;

  beforeEach(async () => {
    const category = await prisma.category.create({
      data: { name: 'category_test' },
    });

    categoryId = category.id;
  });

  const makeProduct = async () => {
    return await prisma.product.create({
      data: {
        name: 'product_test',
        description: 'any description',
        quantity_minimum: 10,
        quantity_supply: 10,
        quantity_maximum: 10,
        active: true,
        categoryId,
      },
    });
  };

  test('Deve retornar 201 ao criar um produto', async () => {
    const response = await request(app).post('/api/product').send({
      name: 'product_test',
      description: 'any description',
      quantity_minimum: 10,
      quantity_supply: 10,
      quantity_maximum: 10,
      categoryId,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('product_test');
    expect(response.body.description).toBe('any description');
    expect(response.body.quantity_minimum).toBe(10);
    expect(response.body.quantity_supply).toBe(10);
    expect(response.body.quantity_maximum).toBe(10);
  });

  test('Deve retornar 400 se dados obrigatórios forem omitidos', async () => {
    const response = await request(app).post('/api/product').send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  test('Deve retornar 204 se não houver produtos', async () => {
    const response = await request(app).get('/api/product');
    expect(response.status).toBe(204);
  });

  test('Deve retornar 200 e uma lista de produtos', async () => {
    await makeProduct();
    const response = await request(app).get('/api/product');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty('id');
  });

  test('Deve retornar 204 ao atualizar um produto', async () => {
    const product = await makeProduct();

    const response = await request(app).put('/api/product').send({
      id: product.id,
      name: 'produto atualizado',
      description: 'nova descrição',
      quantity_minimum: 10,
      quantity_supply: 10,
      quantity_maximum: 10,
      active: true,
      categoryId,
    });

    expect(response.status).toBe(204);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});
