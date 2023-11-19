import express from "express";
import { createComment, deleteComment, getComment, getCommentDetailsID, getCommentID, updateComment } from "../Controllers/commentController.js";
import { checkRole } from "../Config/jwtConfig.js";

const commentRoutes = express.Router();

commentRoutes.get("/get-comment", checkRole,getComment);
commentRoutes.post("/create-comment", createComment);
commentRoutes.get("/get-comment-id/:binh_luan_id", getCommentID);
commentRoutes.get("/get-comment-details/:bao_id", getCommentDetailsID);
commentRoutes.delete("/delete-comment/:binh_luan_id", deleteComment);
commentRoutes.put("/update-comment/:binh_luan_id", updateComment)

export default commentRoutes