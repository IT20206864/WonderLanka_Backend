const router = require("express").Router();
const { response } = require("express");
let Employee=require("../models/employee");

//Add Employee
router.route("/add").post((req,res)=>{
    
    const empname=req.body.empname;
    const emppwd=req.body.emppwd;
    const emprole=req.body.emprole;
    

    const newEmployee = new Employee({
        empname,
        emppwd,
        emprole

    })
    newEmployee.save().then(()=>{
        res.json("Employee Added")
    }).catch((err)=>{
        console.log(err);
    })

})

//read  employee details
router.route('/details').get((req, res) => {
    Employee.find()
      .then(employees => res.json(employees))
      .catch(err => res.status(400).json('Error: ' + err));
  });


//update employee
router.route('/update/:id').post((req, res) => {
    Employee.findById(req.params.id)
      .then(employee => {
        employee.empname=req.body.empname;
        employee.emppwd = req.body.emppwd;
        employee.emprole = req.body.emprole;
        
           employee.save()
          .then(() => res.json('Employee updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });


//delete employee
router.route("/delete:id").delete(async(req,res) =>{
    
    const employee = req.params.id;
    await Employee.findByIdAndDelete(employee).then(()=>{
        res.status(200).send({status : "Employee Deleted!"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Employee unsuccesful!"});
    })
})


//get one driver details
router.route('/:id').get((req, res) => {
    Employee.findById(req.params.id)
      .then(employee => res.json(employee))
      .catch(err => res.status(400).json('Error: ' + err));
  });
module.exports=router;