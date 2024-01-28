const express = require('express');
require('express-async-errors')
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const {MONGO_URI} = require('./utils/config');
const middleware = require('./utils/middleware')
const hourRouter = require('./controllers/hourRouter')
const userRouter = require('./controllers/userRouter');
const loginRouter = require('./controllers/loginRouter');

mongoose.set('strictQuery', false)
mongoose.connect(MONGO_URI)
.then(() => console.log("Connected to mongodb successfully"))
.catch((error) => console.error("error connecting to mongodb", error))

app.use(cors())
app.use(express.static('dist'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/hours', hourRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;