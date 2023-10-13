import express from "express";
import { createNews, deleteNew, getNews, getNewsId, updateNew } from "../Controllers/newsController.js";

const newsRoutes = express.Router();

newsRoutes.get("/get-news", getNews);
newsRoutes.post("/create-news", createNews);
newsRoutes.get("/new-id/:bao_id", getNewsId);
newsRoutes.delete("/delete-new/:bao_id", deleteNew);
newsRoutes.put("/update-new/:bao_id", updateNew);

export default newsRoutes