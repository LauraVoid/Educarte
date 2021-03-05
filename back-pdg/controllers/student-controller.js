const Student = require("../model/Student");

exports.index = async function (req, res, next) {

    await Student.findAll()
    .then(result =>{
        res.send(result)
    })   
  };