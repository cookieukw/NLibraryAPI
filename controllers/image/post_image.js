const imgModel = require("../../models/ImgModel")

exports.postImage = async (req, res) => {
  const { image_url, image_category } = req.body

  if (!image_url) return res.status(422).send({ erro: `Missing param image_url` });
  if (!image_category) return res.status(422).send({ erro: `Missing param image_category` });
    
    const postData = {
      image_category: image_category,
      image_url: image_url
    }
    
    try {
     
      await imgModel.create(postData)
    res.status(201).json({ message: 'Image created successfully!' });
    } catch (error) {
    res.status(500).json({ error: "An error has occurred :(" });
    
  }
}
  
