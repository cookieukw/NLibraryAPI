const imgModel = require("../../models/ImgModel")

exports.getDB = async(req, res)=>{

try {
    const allData = await imgModel.find()
    res.status(200).json(allData)
} catch (error) {
    res.status(404).json({ error: "An error has occurred :(" });
}

}