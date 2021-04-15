const Course = require("../model/Course");
const Teacher_Course = require("../model/Teacher_Course");
const Teacher = require("../model/Teacher");

exports.index = async function (req, res, next) {

    await Course.findAll()
    .then(result =>{
        res.send(result)
    })   
  };
//Search a course by Id and return the course and the teacher's course
exports.findById = async function (req,res,next){



    const teac_course =[];
    const teacher = {};
    const result = await Course.findAll({
        where: {
            institutionId: req.params.instId            
          }
    })
    await Promise.all( 
        result.map(async (course)=>{
       
            await Teacher_Course.findOne({
                where:{
                    courseId: course.id
                }
            }).then((tc)=> teac_course.push(tc))
    
           
        })
    )

     res.send(teac_course)

    

    
    // res.send({teac: teac_course})

    // await Teacher.findOne({
    //     where: {
    //         id: result2.teacherId  
    //       }
    // }).then((teacherf) => res.send({course:result, teacher:teacherf}))

}
  exports.create = async function (req, res, next) {
   const result =  await Course.create({
        name: req.body.name,
        institutionId: req.body.institutionId        
    })    

    await Teacher_Course.create({
        courseId: result.id,
        teacherId: req.body.teacherId        
    }).then(() => res.send({message:"The course was created", course: result}))
    .catch(function(err){
        if(req.body.courseId === undefined){
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


