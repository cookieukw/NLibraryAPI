const mongoose = require("mongoose")
mongoose.set('debug', true);




const CtgModel = mongoose.model("image_category", new mongoose.Schema({
  image_category: { type: String,
 }
  }))



module.exports = CtgModel;
