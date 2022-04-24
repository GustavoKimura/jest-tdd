const request = require('supertest');

const app = require('../../src/app');
const factory = require('../factories');
const truncate = require('../utils/truncate');

describe('Authentication', () => {
    beforeEach(async () => await truncate());

    it('should authenticate with valid credentials', async () => {
        const user = await factory.create('User', {
            password: '1234567890'
        });

        const response = await request(app).post('/sessions').send({
            email: user.email,
            password: '1234567890'
        });

        expect(response.status).toBe(200);
    });

    it('should not authenticate with invalid credentials', async () => {
        const user = await factory.create('User', {
            password: '1234567890'
        });

        const response = await request(app).post('/sessions').send({
            email: user.email,
            password: '0987654321'
        });

        expect(response.status).toBe(401);
    });

    it('should return jwt token when authenticated', async () => {
        const user = await factory.create('User', {
            password: '1234567890'
        });

        const response = await request(app).post('/sessions').send({
            email: user.email,
            password: '1234567890'
        });

        expect(response.body).toHaveProperty('token');
    });

    it('should not be able to authenticate with a invalid user email', async () => {
        const user = await factory.create('User', {
            password: '1234567890'
        });

        const response = await request(app).post('/sessions').send({
            email: 'invalid@gmail.com',
            password: '1234567890'
        });

        expect(response.status).toBe(401);
    });

    it('should be able to access private routes when authenticated', async () => {
        const user = await factory.create('User', {
            password: '1234567890'
        });

        const response = await request(app).get('/dashboard').set('Authorization', `Bearer ${user.generateToken()}`);

        expect(response.status).toBe(200);
    });

    it('should not be able to access private routes without jwt token', async () => {
        const response = await request(app).get('/dashboard');

        expect(response.status).toBe(401);
    });

    it('should not be able to access private routes with invalid jwt token', async () => {
        const response = await request(app).get('/dashboard').set('Authorization', 'Bearer 123123');

        expect(response.status).toBe(401);
    });
});