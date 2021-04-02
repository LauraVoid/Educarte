const Course = require("../model/Course");

exports.index = async function (req, res, next) {

    await Course.findAll()
    .then(result =>{
        res.send(result)
    })   
  };
  exports.create = async function (req, res, next) {
    await Course.create({
        name: req.body.name,
        institutionId: req.body.institutionId        
    }).then(() => res.send("The course was created"))
    .catch(function(err){
        if(req.body.name === undefined){
            res.status(500).send("The course needs a name")
        }else{
            res.status(500).send("There is a problem")
        }
        
       
    })
  };

  exports.update = async function (req, res, next) {
   
    await Course.update({
        name: req.body.name,       
    },{
        where:{
            id: req.body.id
        }
    }).then(() => res.send("The course was updated"))
    .catch(function(err){
        if(req.body.name === undefined){
            res.status(500).send("The course needs a name")
        }else{
            res.status(500).send("There is a problem")
        }
    })
     
  };
  exports.delete = async function (req, res, next) {
      

    await Course.destroy({
        where:{
            id:req.params.id
        }
    }).then(()=> res.send("The course was deleted"))
    .catch(function(err){
        if(req.body.id === undefined){
            res.status(500).send("The id needs to be specified")
        }else{
            res.status(500).send("There is a problem")
        }
    })
  
     
  };


