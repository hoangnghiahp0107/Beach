import express from "express";
import { getUser, login, signUp } from "../Controllers/userController.js";

const userRoutes = express.Router();

userRoutes.post("/signup", signUp);
userRoutes.post("/login", login);
userRoutes.get("/get-user", getUser);


export default userRoutes