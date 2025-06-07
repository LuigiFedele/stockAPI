import request from 'supertest';
import app from '../config/app';
import { prisma } from '../../../../infrastructure/config/PrismaClient';

const randomName = `categoriaTest-${Math.random().toString(36).substring(2, 8)}`;

describe('Category Routes', () => {
  beforeEach(async () => {
    await prisma.category.deleteMany();
  });

  test('Deve retornar 201 ao criar uma categoria', async () => {
    const response = await request(app).post('/api/category').send({
      name: randomName,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(randomName);
  });

  test('deve retornar 400 se o nome não for enviado', async () => {
    const response = await request(app).post('/api/category').send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  test('Deve retornar 204 se a lista estiver vazia', async () => {
    await request(app).get('/api/category').expect(204);
  });

  test('Deve retornar 204 ao chamar a rota para atualizar a categoria', async () => {
    const category = await prisma.category.create({
      data: {
        name: 'any_name',
      },
    });

    await request(app)
      .put('/api/category')
      .send({
        id: category.id,
        name: 'new_name',
      })
      .expect(204);
  });

  test('Deve retornar 204 ao chamar a rota para deletar a categoria', async () => {
    const category = await prisma.category.create({
      data: {
        name: 'any_name',
      },
    });

    await request(app)
      .delete('/api/category')
      .send({
        id: category.id,
      })
      .expect(204);
  });
});
