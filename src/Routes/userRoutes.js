import express from "express";
import { apiCreateAccount, apiGetUser, apiLoginAccount } from "../Controllers/userController.js";

const userRoutes = express.Router();

userRoutes.post("/signup", apiCreateAccount);
userRoutes.post("/login", apiLoginAccount);
userRoutes.get("/get-user", apiGetUser);


export default userRoutes