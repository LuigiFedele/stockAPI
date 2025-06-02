import request from 'supertest';
import app from '../config/app';

describe('Category Routes', () => {
  test('Deve criar uma categoria', async () => {
    await request(app)
      .post('/api/category')
      .send({
        name: 'any_name',
      })
      .expect(201);
  });
});
