const router = require("express").Router();
const { json } = require("express");
const multer = require("multer");
let Itinerary = require("../models/Itineraries");


//Creating storage to add image files

const storage = multer.diskStorage({
    destination : (req,file,callback) =>{
        callback(null,"../images/");
    },
    filename : (req,file,callback) =>{
        callback(null, file.originalname);
    }
}) 

const upload = multer({storage:storage});
//Adding Itinerary
router.route("/add" , upload.single("image") , upload.single("coverImage")).post((req,res) =>{
    

    const newItinerary = new Itinerary({
        name : req.body.name,
        description : req.body.description,
        image : req.file.image,
        coverImage : req.file.coverImage,
        classIt : req.body.classIt,
        priceAdult : req.body.priceAdult,
        priceChild : req.body.priceChild

    })

    newItinerary.save().then(() => {
        res.json("Itinerary Added")
    }).catch((err) =>{
        console.log(err);
    })
})

//Getting Itinerary Details
router.route("/").get((req,res)=>{
    Itinerary.find().then((itineraries) =>{
        res.json(itineraries);
    }).catch((err) =>{
        console.log(err);
    })
})

//Updating Itinerary Details

router.route("/update:id" ,upload.single("image") , upload.single("coverImage")).put(async (req,res) =>{
    const itinerary = req.params.id;

        const name =  req.body.name;
        const description = req.body.description;
        const image = req.file.image;
        const coverImage = req.file.coverImage;
        const classIt = req.body.classIt;
        const priceAdult = req.body.priceAdult;
        const priceChild = req.body.priceChild;

        const itineraryDetails = {
            name,
            description,
            image,
            coverImage,
            classIt,
            priceAdult,
            priceChild,
        }

        const update = await Itinerary.findByIdAndUpdate(itinerary,itineraryDetails).then((req,res)=>{
            res.status(200).send({status : "Itinerary Updated!"})
        }).catch((err) =>{
            console.log(err);
            res.status(500).send({status : "Error in updating itinerary"});
        })
})


//Deleting Itinerary Details

router.route("/delete:id").delete(async(req,res) =>{
    
    const itinerary = req.params.id;
    await Itinerary.findByIdAndDelete(itinerary).then(()=>{
        res.status(200).send({status : "Itinerary Deleted!"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Deletion unsuccesful!"});
    })
})


//Fetch one Itinerary Detail

router.route("/get:id").get(async(req,res)=>{
    const itinerary = req.params.id;
    const itin = await Itinerary.findById(itinerary).then(()=>{
        res.status(200).send({status : "Fetched Itinerary Details" , data : itin});
    }).catch((err)=>{
        res.status(500).send({status : "Fetching unsuccesful!"});
    })
})

module.exports = router;