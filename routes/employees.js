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
router.route("/update/:id").put(async (req, res) => {
    let EmpID = req.params.id;
    const {empname,emppwd,emprole } =
      req.body;
  
    const updateEmployee = {
     empname,
     emppwd,
     emprole,
    };
  
    const update = await Employee.findByIdAndUpdate(EmpID, updateEmployee)
      .then(() => {
        res.status(200).send({ status: "Employee Updated" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with updating data" });
      });
  });
  
  
  //delete driver
  router.route("/delete:id").delete(async(req,res) =>{
      
      const driver = req.params.id;
      await Driver.findByIdAndDelete(driver).then(()=>{
          res.status(200).send({status : "Driver Deleted!"});
      }).catch((err)=>{
          console.log(err);
          res.status(500).send({status:"Deletion unsuccesful!"});
      })
  })


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


//get one employee details
router.route('/:id').get((req, res) => {
    Employee.findById(req.params.id)
      .then(employee => res.json(employee))
      .catch(err => res.status(400).json('Error: ' + err));
  });
module.exports=router;