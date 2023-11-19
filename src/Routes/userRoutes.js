import express from "express";
import { deleteUser, getUser, getUserID, login, logout, signUp, updateUser } from "../Controllers/userController.js";
import { checkRole, checkToken } from "../Config/jwtConfig.js";

const userRoutes = express.Router();

userRoutes.post("/signup", signUp);
userRoutes.post("/login", login);
userRoutes.post("/logout", logout);
userRoutes.get("/get-user", checkRole ,getUser);
userRoutes.get("/user-id/:nguoi_dung_id", checkToken ,getUserID);
userRoutes.delete("/delete-user/:nguoi_dung_id", checkRole, deleteUser);
userRoutes.put("/update-user/:nguoi_dung_id", checkToken, updateUser);


export default userRoutes