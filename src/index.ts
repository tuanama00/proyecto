import express, {Request, Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {PrismaClient} from '@prisma/client'
import allRoutes from './routes'
import {notFoundHandler} from './middlewares/errorsHandlers';
import {tokenMiddleware} from './middlewares/token';

dotenv.config();

const prisma = new PrismaClient();


//framework express
const app = express();

// middleware
app.use(cors({origin: '*'}))
app.use(express.json());
app.use('/api/v1', tokenMiddleware, allRoutes);
app.use(notFoundHandler);

export default app;