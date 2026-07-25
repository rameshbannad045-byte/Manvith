const request = require('supertest');
const app = require('../src/index');
describe('GET /', () => {
it('responds with 200 and a message', async () => {
const res = await request(app).get('/');
expect(res.statusCode).toBe(200);
expect(res.body.message).toBe('Hello from CI/CD pipeline!');
});
});
describe('GET /health', () => {
it('responds with status ok', async () => {
const res = await request(app).get('/health');
expect(res.statusCode).toBe(200);
expect(res.body.status).toBe('ok');
});
});
