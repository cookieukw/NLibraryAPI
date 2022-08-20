const imgModel = require("../../models/ImgModel")

exports.getDB = async(req, res)=>{
    const pageOptions = {
        page: parseInt(req.query.page, 10) || 0,
        limit: parseInt(req.query.limit, 10) || 10
    }
  
 if(pageOptions.limit >= 21) return res.status(416).json({ message: "The maximum size of items is 20"});
try {
     const allData = await imgModel.find()
    .skip(pageOptions.page * pageOptions.limit) 
    .limit(pageOptions.limit)
    .select("-_id")
    .sort([['date', -1]])
    .exec((err, events)=> {
        if(err) return res.status(404).json({ message: "An error has occurred on search :("});

        imgModel.countDocuments().exec((err, count)=> {
            if(err) return res.status(404).json({ error: "An error has occurred on count :("});
            res.status(200).json(events)
        })
    })
} catch (error) {
    res.status(404).json({ message: "An error has occurred on get method:("});
}

}