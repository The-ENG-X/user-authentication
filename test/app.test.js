const request = require('supertest');
const app = require('../app');

const users = [
  { username: 'user1', password: 'password1' },
];

describe('Authentication', () => {
  it('should login with correct credentials', async () => {
    const user = users.find(u => u.username === 'user1');
    if (!user) throw new Error('User not found');

    const res = await request(app)
      .post('/login')
      .send({ username: user.username, password: user.password });
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
