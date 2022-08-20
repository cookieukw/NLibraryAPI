const imgModel = require("../../models/ImgModel")


exports.getAllCategory = async(req, res)=>{
    const pageOptions = {
        page: parseInt(req.query.page, 10) || 0,
        limit: parseInt(req.query.limit, 10) || 20
    }
 if(pageOptions.limit >= 41) return res.status(416).json({ message: "The maximum size of category is 20"});
try {
     const allData = await imgModel.find()
     .skip(pageOptions.page * pageOptions.limit) 
    .limit(pageOptions.limit)
    .select("-_id")
    .select("-image_url")
    .sort([['date', -1]])
    .distinct('image_category')
    .exec((err, events)=> {
        if(err) return res.status(404).json({ message: "An error has occurred on search :("});

        imgModel.countDocuments().exec((err, count)=> {
            if(err) return res.status(404).json({ error: "An error has occurred on count :("});
            res.status(200).json({ size: count, data: events })
        })
    })
            
} catch (error) {
    res.status(404).json({ message: "An error has occurred on get method:("});
}

}