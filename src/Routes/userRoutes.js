import express from "express";
import { signUp } from "../Controllers/userController.js";

const userRoutes = express.Router();

userRoutes.post("/signup", signUp);


export default userRoutes