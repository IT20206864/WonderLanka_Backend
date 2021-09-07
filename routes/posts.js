const express = require('express');
const posts = require('../models/posts');
const Hotels = require('../models/posts');

const router = express.Router();

//save hotal details

router.post('/post/save',(req,res)=>{
    let newHotel = new Hotels(req.body);

    newHotel.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }

        return res.status(200).json({
            success:"Hotel saved successfully"
        });
  });
});

//get hotel details

router.get('/posts',(req,res)=>{
    Hotels.find().exec((err,posts)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }

        return res.status(200).json({
        success:true,
        existingHotels:posts
        });
    });
});

//get a specific hotel
router.get('/post/:id',(req,res)=>{
    let hotelID = req.params.id;

    posts.findById(hotelID,(err,post)=>{
    if(err){
        return res.status(400).json({success:false,err})
    }

    return res.status(200).json({
        success:true,
        post
    });

    });
});

//update hotels

router.put('/post/update/:id',(req,res)=>{
    Hotels.findByIdAndUpdate(
        req.params.id,{
            $set:req.body
        },
        (err,post)=>{
            if(err){
                return res.status(400).json({
                    error:err
                });
            }
    
            return res.status(200).json({
            success:"Updated Succesfully"
            });
        
        }
    );
});

//delete hotels
router.delete('/post/delete/:id',(req,res)=>{
    Hotels.findByIdAndRemove(req.params.id).exec((err,deletedHotel)=>{
        if(err) return res.status(400).json({
                message:"Delete Unsuccesful",err
            });
        

        return res.json({
            message:"Delete Succesful",deletedHotel
        });
    });
});


module.exports = router;