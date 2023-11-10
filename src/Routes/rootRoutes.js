import express from 'express';
import userRoutes from './userRoutes.js';
import newsRoutes from './newsRoutes.js';
import commentRoutes from './commentRoutes.js';
import imageRoutes from './imageRoutes.js';

const rootRouter = express.Router();

// Đối tượng user
rootRouter.use("/auth", [userRoutes]);

// Đối tượng news
rootRouter.use("/news", [newsRoutes])

// Đối tượng news
rootRouter.use("/comment", [commentRoutes])

// Đối tượng news
rootRouter.use("/image", [imageRoutes])

export default rootRouter;
