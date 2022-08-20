const express = require("express");
const rot = express.Router();
 const { getDB } = require("../controllers/image/get_db")
 const { postImage } = require("../controllers/image/post_image")
 const { updateImage } = require("../controllers/image/update_image")
 const { deleteImage } = require("../controllers/image/delete_image")
 const { getAnImage } = require("../controllers/image/get_an_image")

 rot.get("/", getDB);
 rot.post("/", postImage);
 rot.delete("/:image_id", deleteImage);
 rot.patch("/:image_id", updateImage);
 rot.get("/:image_id", getAnImage);

module.exports = rot;
