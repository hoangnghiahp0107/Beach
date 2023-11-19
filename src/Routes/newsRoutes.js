import express from "express";
import { createNews, deleteNew, getNews, getNewsId, getSearchName, updateNew } from "../Controllers/newsController.js";
import { checkRole } from "../Config/jwtConfig.js";

const newsRoutes = express.Router();

newsRoutes.get("/get-news", checkRole ,getNews);
newsRoutes.get("/get-news-index", getNews);
newsRoutes.post("/create-news", checkRole,createNews);
newsRoutes.get("/new-id/:bao_id", getNewsId);
newsRoutes.delete("/delete-new/:bao_id", checkRole, deleteNew);
newsRoutes.put("/update-new/:bao_id", checkRole,updateNew);
newsRoutes.get("/get-search-name/:tieu_de_bao", getSearchName)

export default newsRoutes