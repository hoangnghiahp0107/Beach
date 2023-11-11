import express from 'express';
import userRoutes from './userRoutes.js';
import newsRoutes from './newsRoutes.js';
import commentRoutes from './commentRoutes.js';
import imageRoutes from './imageRoutes.js';

const rootRouter = express.Router();

rootRouter.use("/auth", [userRoutes]);

rootRouter.use("/news", [newsRoutes])

rootRouter.use("/comment", [commentRoutes])

rootRouter.use("/image", [imageRoutes])

export default rootRouter;
