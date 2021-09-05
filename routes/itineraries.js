const router = require("express").Router();
const { json } = require("express");
const multer = require("multer");
let Itinerary = require("../models/Itineraries");


//Creating storage to add image files

const storage = multer.diskStorage({
    destination : (req,file,callback) =>{
        callback(null,"./images/");
    },
    filename : (req,file,callback) =>{
        callback(null, file.originalname);
    }
})

const upload = multer({storage:storage});



//Adding Itinerary
router.post("/add" , upload.fields([
    { name : 'itineraryImage', maxCount: 1 },
    { name : 'itineraryCoverImage', maxCount: 1 },
  ]),(req,res) =>{
    

    const newItinerary = new Itinerary({

        itineraryId : req.body.itineraryId,
        itineraryDays : req.body.itineraryDays,
        itineraryName : req.body.itineraryName,
        itineraryDesc : req.body.itineraryDesc,
        itineraryImage : req.files.itineraryImage[0].originalname,
        itineraryCoverImage : req.files.itineraryCoverImage[0].originalname,
        itineraryClass : req.body.itineraryClass,
        itineraryPriceAdult : req.body.itineraryPriceAdult,
        itineraryPriceChild : req.body.itineraryPriceChild

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

router.route("/update/:id" ,upload.fields([
    { name: 'itineraryImage', maxCount: 1 },
    { name: 'itineraryCoverImage', maxCount: 1 },
  ])).put(async (req,res) =>{
    const itinerary = req.params.id;

    const itineraryId = req.body.itineraryId;
    const itineraryDays = req.body.itineraryDays;
    const itineraryName = req.body.itineraryName;
    const itineraryDesc = req.body.itineraryDesc;
    const itineraryImage = req.file.originalname;
    const itineraryCoverImage = req.file.originalname;
    const itineraryClass = req.body.itineraryClass;
    const itineraryPriceAdult = req.body.itineraryPriceAdult;
    const itineraryPriceChild = req.body.itineraryPriceChild;

        const itineraryDetails = {
            itineraryId,
            itineraryDays,
            itineraryName,
            itineraryDesc, 
            itineraryImage, 
            itineraryCoverImage, 
            itineraryClass, 
            itineraryPriceAdult,
            itineraryPriceChild 
        }

        const update = await Itinerary.findByIdAndUpdate(itinerary,itineraryDetails).then((req,res)=>{
            res.status(200).send({status : "Itinerary Updated!"})
        }).catch((err) =>{
            console.log(err);
            res.status(500).send({status : "Error in updating itinerary"});
        })
})


//Deleting Itinerary Details

router.route("/delete/:id").delete(async(req,res) =>{
    
    const itinerary = req.params.id;
    await Itinerary.findByIdAndDelete(itinerary).then(()=>{
        res.status(200).send({status : "Itinerary Deleted!"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Deletion unsuccesful!"});
    })
})


//Fetch one Itinerary Detail

router.route("/get/:id").get(async(req,res)=>{
    const itinerary = req.params.id;
    const itin = await Itinerary.findById(itinerary).then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.status(500).send({status : "Fetching unsuccesful!"});
    })
})

module.exports = router;