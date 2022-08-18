const express = require("express");
const rot = express.Router();
const { getImages } = require("../controllers/image/get_images")
const { postImage } = require("../controllers/image/post_image")
const { updateImage } = require("../controllers/image/update_image")
const { deleteImage } = require("../controllers/image/delete_image")
const { getAnImage } =require("../controllers/image/get_an_image")

rot.get("/", getImages);
rot.post("/", postImage);
rot.delete("/", deleteImage);
rot.patch("/", updateImage);
rot.get("/:image_id", getAnImage);

module.exports = rot;
