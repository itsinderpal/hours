const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

const api = supertest(app);

test('new hour added', async () => {

    const initialHours = (await api.get('/api/hours')).body.length;

    const newHour = {
        id: (Math.random * 1000)*(Math.random * 1000),
        date: new Date().toLocaleDateString('en-CA'),
        input: "00:00",
        output: "23:59",
    }

    const res = await api
    .post('/api/hours')
    .send(newHour)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    expect(res.body.input).toBe(newHour.input);
    expect(res.body.output).toBe(newHour.output);

    const newHours = (await api.get('/api/hours')).body.length;

    expect(newHours).toBe(initialHours + 1);

})

afterAll(async () => {
    await mongoose.connection.close();
})
