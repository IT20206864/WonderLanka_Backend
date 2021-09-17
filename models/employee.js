const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const employeeSchema=new Schema({
    empname:{
        type:String,
        required:true
    },
    emppwd:{
        type:String,
        required:true
    },
    emprole:{
        type:String,
        required:true
    }
}) 

const Employee=mongoose.model("Employee",employeeSchema);
module.exports=Employee;