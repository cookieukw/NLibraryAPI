const express = require("express");
const rot = express.Router();

const { getAllCategory } = require("../controllers/image/get_all_category")
const { getFromCategory } = require("../controllers/image/get_all_from_category")

rot.get("/all", getAllCategory);
rot.get("/", getFromCategory);

module.exports = rot;