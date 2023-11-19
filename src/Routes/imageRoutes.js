import express from "express";
import { getImages, getImageID, createImage, deleteImage, updateImage } from "../Controllers/imageController.js";
import multer from "multer";
import { checkRole, checkToken } from "../Config/jwtConfig.js";

const imageRoutes = express.Router();

imageRoutes.get("/get-images", checkRole,getImages);
imageRoutes.get("/get-img-id/:hinh_id", getImageID);
imageRoutes.delete("/delete-image/:hinh_id", checkToken, deleteImage)

const storage = multer.diskStorage({
    destination: process.cwd() + "/public/img",
    filename: (req, file, callback) => {
        let date = new Date();
        let newName = date.getTime();
        callback(null, newName + "_" + file.originalname);
    }
});

const upload = multer({ storage });

imageRoutes.post("/upload", upload.array("file"), checkToken, createImage);
imageRoutes.put("/update-image/:hinh_id", upload.array("file"), checkToken, updateImage);


export default imageRoutes