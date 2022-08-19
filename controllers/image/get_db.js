const imgModel = require("../../models/ImgModel")

exports.getDB = async(req, res)=>{
    const pageOptions = {
        page: parseInt(req.query.page, 10) || 0,
        limit: parseInt(req.query.limit, 10) || 10
    }

try {
     const allData = await imgModel.find()
    .skip(pageOptions.page * pageOptions.limit) 
    .limit(pageOptions.limit)
    .sort("_id").exec((err, events)=> {
        if(err) return res.status(404).json({ message: "An error has occurred :("});

        imgModel.countDocuments().exec((err, count)=> {
            if(err) return res.status(404).json({ error: "An error has occurred :("});
            res.status(200).json(events)
        })
    })
} catch (error) {
    res.status(404).json({ message: "An error has occurred :("});
}

}