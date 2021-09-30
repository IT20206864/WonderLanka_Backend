const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const driverSchema=new Schema({
    driverid:{
        type:String,
        required:true
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
        required:true
    },
    licenseid:{
        type:String,
        required:true
    },
    languages:{
        type:String,
        required:true
    }
}) 

const Driver=mongoose.model("Driver",driverSchema);
module.exports=Driver;