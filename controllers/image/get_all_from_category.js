const imgModel = require("../../models/ImgModel")


exports.getFromCategory = async(req, res)=>{
    const pageOptions = {
        page: parseInt(req.query.page, 10) || 0,
        limit: parseInt(req.query.limit, 10) || 20,
        category: req.query.category
    }

if(!pageOptions.category) return res.status(404).json({ message: "Category not found"});
    
    
 if(pageOptions.limit >= 21) return res.status(416).json({ message: "The maximum size of category is 20"});


 try {
     const allData = await imgModel.find({image_category: pageOptions.category })
     .skip(pageOptions.page * pageOptions.limit) 
    .limit(pageOptions.limit)
    .select("-_id")
    .sort([['date', -1]])
    .exec((err, events)=> {
      console.log(events)
        if(err) return res.status(404).json({ message: "An error has occurred on search :("});
if(events.length === 0) return res.status(404).json({ message: "Category not exists :("});
        imgModel.countDocuments().exec((err, count)=> {
            if(err) return res.status(404).json({ error: "An error has occurred on count :("});
            res.status(200).json({ size: events.length, data: events })
        })
    })
            
} catch (error) {
    res.status(404).json({ message: "An error has occurred on get method:("});
}

}