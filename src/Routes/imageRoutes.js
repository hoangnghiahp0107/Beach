import express from "express";
import { getImages, getImageID, createImage, deleteImage } from "../Controllers/imageController.js";
import multer from "multer";

const imageRoutes = express.Router();

imageRoutes.get("/get-images", getImages);
imageRoutes.get("/get-img-id/:hinh_id", getImageID);
imageRoutes.delete("/delete-image/:hinh_id", deleteImage)

const storage = multer.diskStorage({
    destination: process.cwd() + "/public/img",
    filename: (req, file, callback) => {
        let date = new Date();
        let newName = date.getTime();
        callback(null, newName + "_" + file.originalname);
    }
});

const upload = multer({ storage });

imageRoutes.post("/upload", upload.array("file"), createImage);


export default imageRoutes