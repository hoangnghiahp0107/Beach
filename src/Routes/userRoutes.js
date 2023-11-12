import express from "express";
import { deleteUser, getUser, getUserID, login, logout, signUp, updateUser } from "../Controllers/userController.js";

const userRoutes = express.Router();

userRoutes.post("/signup", signUp);
userRoutes.post("/login", login);
userRoutes.post("/logout", logout);
userRoutes.get("/get-user", getUser);
userRoutes.get("/user-id/:nguoi_dung_id", getUserID);
userRoutes.delete("/delete-user/:nguoi_dung_id", deleteUser);
userRoutes.put("/update-user/:nguoi_dung_id", updateUser);


export default userRoutes