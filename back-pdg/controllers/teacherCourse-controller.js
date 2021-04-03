const Teacher_Course = require("../model/Teacher_Course");

exports.assignCourse = async function(req,res,next){
    await Teacher_Course.create({
        courseId: req.body.courseId,
        teacherId: req.body.teacherId        
    }).then(() => res.send({message:"The teacher was assigned"}))
    .catch(function(err){
        if(req.body.courseId === undefined){
            res.status(500).send("The course needs a name")
        }else{
            res.status(500).send("There is a problem")
        }
        
       
    })
}