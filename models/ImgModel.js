const mongoose = require("mongoose")

const ImgModel = mongoose.model("image",{
  image_category:String,
  image_url: String
})

module.exports = ImgModel;