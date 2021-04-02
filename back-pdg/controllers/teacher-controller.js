const Teacher = require("../model/Teacher");

exports.index = async function (req, res, next) {

    await Teacher.findAll()
    .then(result =>{
        res.send(result)
    })   
  };

