const imgModel = require("../../models/ImgModel")

exports.getAnImage = async (req, res) => {
  const id = req.params.image_id
  try {
    const anImage = await imgModel.findOne({
      _id: id
    })
    res.status(200).json(anImage)
  } catch (error) {
    res.status(500).json({ error: "An error has occurred :(" });
  }
  
  }