const express = require('express');
const cors = require('cors');
const userRouter = require('./routers/userRouter');
const newsRouter = require('./routers/newsRouter');
const commentRouter = require('./routers/commentRouter');
// Import routers files here

const app = express();

app.use(cors());
app.use(express.json());
// Router middlewares would be placed bellow
app.use('/user', userRouter);
app.use('/news',newsRouter);
app.use('/comment', commentRouter);

module.exports = app;


