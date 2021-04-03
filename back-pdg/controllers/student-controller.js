const Student = require("../model/Student");

exports.index = async function (req, res, next) {

    await Student.findAll()
    .then(result =>{
        res.send(result)
    })   
  };

exports.assignToCourse = async function (req,res,next){
    const students = req.body.students
    
    await students.forEach(student => {
         Student.update({
            courseId: req.body.courseId
        },{
            where:{
                id: student.id
            }
        }).catch(function(err){           
                res.status(500).send("There is a problem")            
        })
        
    })
    res.status(200).send({message:"The students was assigned"})
}