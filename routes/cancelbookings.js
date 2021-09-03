const express  = require('express');

const Cancel = require('../models/cancelbookings');

const router  = express.Router();

//save Cancel

router.post('/cancel/save',(req,res) => {
    let newPost = new Cancel(req.body);

    newPost.save((err) =>{ 
        if(err){
            return res.status(400).json({
                    error:err
            });
        }
        return res.status(200).json({
            success:"Cancel saved sucessfully"
        });
    });
});

//get Cancel
router.get('/cancels',(req,res) =>{
    Cancel.find().exec((err,Cancel) =>{
        if(err){
            return res.status(400).json({
                error:err
        });
        }
        return res.status(200).json({
            success:true,
            existingCancel:Cancel
        });
    });     
});


//get a specific post
router.get("/cancel/:id",(req,res)=>{
    let postId = req.params.id;
    Cancel.findById(postId,(err,post)=>{
        if(err){
        return res.status(400).json({success:false,err})
    }

    return res.status(200).json({
        success:true,
        post
    });
});
});


module.exports = router;