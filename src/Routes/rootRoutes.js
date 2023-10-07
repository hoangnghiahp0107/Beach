import express from 'express';
import userRoutes from './userRoutes.js';
const rootRouter = express.Router();

// Đối tượng user
rootRouter.use("/auth", [userRoutes]);

export default rootRouter;
