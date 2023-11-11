import express from "express";
import { createNews, deleteNew, getNews, getNewsId, getSearchName, updateNew } from "../Controllers/newsController.js";

const newsRoutes = express.Router();

newsRoutes.get("/get-news", getNews);
newsRoutes.post("/create-news", createNews);
newsRoutes.get("/new-id/:bao_id", getNewsId);
newsRoutes.delete("/delete-new/:bao_id", deleteNew);
newsRoutes.put("/update-new/:bao_id", updateNew);
newsRoutes.get("/get-search-name/:tieu_de_bao", getSearchName)

export default newsRoutes