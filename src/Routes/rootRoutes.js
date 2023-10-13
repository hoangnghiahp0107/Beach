import express from 'express';
import userRoutes from './userRoutes.js';
import newsRoutes from './newsRoutes.js';

const rootRouter = express.Router();

// Đối tượng user
rootRouter.use("/auth", [userRoutes]);

// Đối tượng news
rootRouter.use("/news", [newsRoutes])

export default rootRouter;
