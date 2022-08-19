const imgModel = require("../../models/ImgModel")

exports.deleteImage = async (req, res) => {
  const image_id  = req.params.image_id
try {
  
  const anImage = await imgModel.findOne({
    _id: image_id
  })

  if(!anImage) return res.status(422).json({ error: "Image not found. >:(" });
  
  const deletedImage = await imgModel.deleteOne({ _id: image_id })
  if(!deletedImage.deletedCount){
    return res.status(204).send({ erro: `There are 0 parameters` });
  } 
  if(deletedImage.deletedCount === 0){
    return res.status(422).send({ erro: `No changes made ._.` });
  } 
  res.status(200).json({ message: "Image successfully deleted!" })
} catch (error) {
  res.status(500).json({ error: "An error has occurred :(" });

}
 
}
  