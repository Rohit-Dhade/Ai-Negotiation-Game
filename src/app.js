import express from 'express';
const app = express();
import authRouter from './routes/auth.routes.js';

app.use('/api/auth', authRouter);1
import dotenv from 'dotenv';
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});


export default app;