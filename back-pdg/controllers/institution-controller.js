const Institution = require("../model/Institution");

exports.index = async function (req, res, next) {

    await Institution.findAll()
    .then(result =>{
        res.send(result)
    })   
  };
  exports.create = async function (req, res, next) {
    await Institution.create({
        name: req.body.name,
        email:req.body.email,
        password:req.body.password
    }).then(() => res.send("The institution was created"))
    .catch(function(err){
        if(req.body.name === undefined){
            res.status(500).send("The institution needs a name")
        }else if(req.body.email === undefined){
            res.status(500).send("The institution needs a email")
        }else if(req.body.password === undefined){
            res.status(500).send("The institution needs a password")
        }else{
            res.status(500).send("There is a problem")
        }
        
       
    })
  };

  exports.update = async function (req, res, next) {
   
    await Institution.update({
        name: req.body.name,
        email:req.body.email,
        password:req.body.password
    },{
        where:{
            id: req.body.id
        }
    }).then(() => res.send("The institution was updated"))
    .catch(function(err){
        if(req.body.name === undefined){
            res.status(500).send("The institution needs a name")
        }else if(req.body.email === undefined){
            res.status(500).send("The institution needs a email")
        }else if(req.body.password === undefined){
            res.status(500).send("The institution needs a password")
        }else if(req.body.id === undefined){
            res.status(500).send("To update needs id")
        }else{
            res.status(500).send("There is a problem")
        }
    })
     
  };
  exports.delete = async function (req, res, next) {
   
    await Institution.destroy({
        where:{
            id:req.body.id
        }
    }).then(()=> res.send("The institution was deleted"))
    .catch(function(err){
        if(req.body.id === undefined){
            res.status(500).send("The id needs to be specified")
        }else{
            res.status(500).send("There is a problem")
        }
    })
  
     
  };


