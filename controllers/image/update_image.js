const imgModel = require("../../models/ImgModel")


exports.updateImage = async (req, res) => {
  const { image_url, image_category } = req.body
 
  // if (req.body) return res.status(422).send({ erro: `There are 0 parameters` });
  
  const id = req.params.image_id
  const patchData = {
    image_category: image_category,
    image_url: image_url
  }

  try {
    const updatedImage = await imgModel.updateOne({
      _id: id
    }, patchData)

    if(!updatedImage.matchedCount){
      return res.status(204).send({ erro: `There are 0 parameters` });
    } 
  
    if(updatedImage.matchedCount == 0){
      return res.status(422).send({ erro: `No changes made ._.` });
    } 
  
    const anImage = await imgModel.findOne({
      _id: id
    })
    
    if(!anImage) return res.status(422).json({ error: "User not found. >:(" });

    res.status(200).json({ message: "Image successfully changed!" })
  } catch (error) {
    res.status(500).json({ error: "An error has occurred :(" });
  }
  
 
}