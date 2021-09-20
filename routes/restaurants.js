const router = require("express").Router();
const { json } = require("express");
const multer = require("multer");
let Restaurant = require("../models/Restaurants");





//Creating storage to add image files

const storage = multer.diskStorage({
    destination : (req,file,callback) =>{
        callback(null,"../hotelImages/");
    },
    filename : (req,file,callback) =>{
        callback(null, file.originalname);
    }
}) 

const upload = multer({storage:storage});
//Adding Restaurant
router.route("/add" , upload.single("coverImage")).post((req,res) =>{
    

    const newRestaurant = new Restaurant({
        restID : req.body.restID,
        restName : req.body.restName,
        restDescription : req.body.restDescription,
        restTele: req.body.restTele,
        restEmail: req.body.restEmail,
        restType: req.body.restType,
        restLocation: req.body.restLocation,
        coverImage : req.file.coverImage,
        

    })

    newRestaurant.save().then(() => {
        res.json("Restuarant Added")
    }).catch((err) =>{
        console.log(err);
    })
})

//Getting Resturant Details
router.route("/").get((req,res)=>{
    Restaurant.find().then((restaurants) =>{
        res.json(restaurants);
    }).catch((err) =>{
        console.log(err);
    })
})

//Updating Restaurant Details

router.route("/update:id" , upload.single("coverImage")).put(async (req,res) =>{
    const restaurant = req.params.id;

    const restID = req.body.restID;
    const restName = req.body.restName;
    const restDescription = req.body.restDescription;
    const restTele = req.body.restTele;
    const restEmail = req.body.restEmail;
    const restType = req.body.restType;
    const restLocation = req.body.restLocation;
    const coverImage = req.file.coverImage;

        

        const restaurantDetails = {
            restID,
            restName,
            restDescription,
            restTele,
            restEmail,
            restType,
            restLocation,
            coverImage,
           
        }

        const update = await Restaurant.findByIdAndUpdate(restaurant,restaurantDetails).then((req,res)=>{
            res.status(200).send({status : "Restaurant Updated!"})
        }).catch((err) =>{
            console.log(err);
            res.status(500).send({status : "Error in updating Restaurant"});
        })
})


//Deleting restauarant Details

router.route("/delete:id").delete(async(req,res) =>{
    
    const restaurant = req.params.id;
    await Restaurant.findByIdAndDelete(restaurant).then(()=>{
        res.status(200).send({status : "Restaurant Deleted!"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Deletion unsuccesful!"});
    })
})


//Fetch one Restaurant Detail

router.route("/get:id").get(async(req,res)=>{
    const restaurant = req.params.id;
    const rest = await Restaurant.findById(restaurant).then(()=>{
        res.status(200).send({status : "Fetched Restaurant Details" , data : rest});
    }).catch((err)=>{
        res.status(500).send({status : "Fetching unsuccesful!"});
    })
})


//Fetch Restuarant Image
router.route("/getcoverImage/:id").get(async(req,res)=>{
    const restaurant = req.params.id;
    const  rest = await Restaurant.findById(restaurant).then((data)=>{
        const coverImage = data.RestaurantImage;
        const file = `./hotelImages/${coverImage}`;
        res.download(file);
    }).catch((err)=>{
        res.status(500).send({status : "Fetching Image unsuccesful!"});
    })
})
module.exports = router;