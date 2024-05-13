const request = require('supertest');
const app = require('../app');

import('chai').then(chai => {
  const expect = chai.expect;

      describe('Authentication', () => {
        it('should login with correct credentials', async () => {
          const res = await request(app)
            .post('/login')
            .send({ username: 'user1', password: 'password1' });
          expect(res.statusCode).toEqual(200);
          expect(res.text).toEqual('Login successful');
        });

        it('should not login with incorrect credentials', async () => {
          const res = await request(app)
            .post('/login')
            .send({ username: 'user1', password: 'wrongpassword' });
          expect(res.statusCode).toEqual(401);
          expect(res.text).toEqual('Invalid username or password');
        });
      });
});