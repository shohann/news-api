const express = require('express');
const cors = require('cors');
const userRouter = require('./routers/userRouter');
const newsRouter = require('./routers/newsRouter');
// Import routers files here

const app = express();

app.use(cors());
app.use(express.json());
// Router middlewares would be placed bellow
app.use('/user', userRouter);
app.use('/news',newsRouter)

module.exports = app;


