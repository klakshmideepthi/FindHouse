const express = require('express');
const router = express.Router();
const {Room} =require("../models/Rooms")
const multer = require('multer');



var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png'||ext!=='.jpeg') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")


router.post("/uploadImage", (req, res) => {

    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })

});

router.post("/uploadroom", async(req, res) => {

    const room = new Room(req.body)

  await  room.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});

router.post("/getrooms",async(req,res)=>{
    // let order = req.body.order ? req.body.order : "desc";
    // let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    console.log("hello")
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs={}
    for (let key in req.body.filters) {

        if (req.body.filters[key].length > 0) {
            if (key === "price" || key==="sqft") {
                if(req.body.filters[key].length>0)
                {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
console.log(findArgs)
let term = req.body.searchTerm;
console.log(term)
if(term)
{
    await Room.find(findArgs)
    .find({ $text: { $search: term } })
    .sort([["rating", "desc","noofusers","desc"]])
    .skip(skip)
    .limit(limit)
    .exec((err,rooms)=>{
        if (err) {console.log(err); return res.status(400).json({ success: false, err })}
       // console.log(rooms)
        return res.status(200).json({ success: true,rooms })
    
    })

}
else{
    await Room.find(findArgs)
    .sort([["rating", "desc"],["noofusers","desc"]])
    .skip(skip)
    .limit(limit)
    .exec((err,rooms)=>{
        if (err) {console.log(err); return res.status(400).json({ success: false, err })}
       // console.log(rooms)
        return res.status(200).json({ success: true,rooms })
    
    })
}
})

router.post("/roomid",async(req,res)=>{
    console.log(req.body)
    const roomid=req.body.roomId;
    const rat1=req.body.rating;
    const room=await Room.findOne({_id:roomid});
    let rat=((room.noofusers*room.rating)+(rat1))/(room.noofusers+1);
    rat=Math.round(rat);
    room.rating=rat;
    room.noofusers=room.noofusers+1;
    room.save();
    console.log(room.rating);
    console.log(room.noofusers);
    res.status(200).json("success");
})

router.get("/rooms_by_id", (req, res) => {
    let type = req.query.type
    let roomIds = req.query.id
    console.log("dfdf")
    console.log("req.query.id", req.query.id)

    if (type === "array") {
        let ids = req.query.id.split(',');
        roomIds = [];
        roomIds = ids.map(item => {
            return item
        })
    }

    console.log("roomIds", roomIds)


    //we need to find the product information that belong to product Id 
    Room.find({ '_id': { $in: roomIds } })
        .exec((err, room) => {
            if (err) return res.status(400).send(err)
            console.log(room)
            return res.status(200).send(room)
        })
});

module.exports= router;
