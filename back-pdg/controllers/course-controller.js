const Course = require("../model/Course");
const Teacher_Course = require("../model/Teacher_Course");
const Teacher = require("../model/Teacher");

const getPagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

exports.index = async function (req, res, next) {
  const page = parseInt(req.query.page);
  const size = parseInt(req.query.limit);
  const { limit, offset } = getPagination(page, size);
  await Course.findAll({ limit, offset }).then((result) => {
    res.status(200).send(result);
  });
};
exports.count = async function (req, res) {
  await Course.findAll().then((result) => {
    const total = result.length;
    return res.status(200).json({
      total,
    });
  });
}
exports.findInstitutionCourses = async function (req, res, next) {
  await Course.findAll({
    where: {
      institutionId: req.params.instId
    }
    
  }).then((result) => {
    res.send(result);
  });
};

//Search by institution Id and return the course and the teacher's course
exports.findTeacherByInstitutionId = async function (req, res, next) {
  const final = [];
  const result = await Course.findAll({
    where: {
      institutionId: req.params.instId,
    },
  }).catch(function(err){
    console.log(err)
    res.status(403)
  })
  await Promise.all(
    result.map(async (course) => {

      await Teacher_Course.findOne({
        where: {
          courseId: course.id
        }
      }).then((tc) => {
        if (tc !== null) {
          
            const data = {
              nameCourse: course.name,
              courseId: tc.courseId,
              teacherId: tc.teacherId
            }
            final.push(data)          
        }
      }).catch(function(err){
        console.log(err)
        res.status(403)
      })
    })
  )
  await Promise.all(
    final.map(async (teach)=>{
      await Teacher.findOne({
        where: {
            id: teach.teacherId
          }
    }).then((teacherf) => {
      teach.teacherName = teacherf.name + " " +teacherf.lastname
    }).catch(function(err){
      console.log(err)
      res.status(403)
    })

    })
  )
  res.status(200).send(final)

};
exports.create = async function (req, res, next) {
  const result = await Course.create({
    name: req.body.name,
    institutionId: req.body.institutionId,
  });

  await Teacher_Course.create({
    courseId: result.id,
    teacherId: req.body.teacherId,
  })
    .then(() => res.send({ message: "The course was created", course: result }))
    .catch(function (err) {
      if (req.body.courseId === undefined) {
        res.status(500).send("The course needs a name");
      } else {
        res.status(500).send("There is a problem");
      }
    });
};

exports.update = async function (req, res, next) {
  await Course.update(
    {
      name: req.body.name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
  await Teacher_Course.update(
    {
      teacherId: req.body.teacherId
    },
    {
      where:{
        courseId:req.params.id,
      }
    }
  )
    .then(() => res.send("The course was updated"))
    .catch(function (err) {
      if (req.body.name === undefined) {
        res.status(500).send("The course needs a name");
      } else {
        res.status(500).send("There is a problem");
      }
    });
};
exports.delete = async function (req, res, next) {
  await Course.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => res.send("The course was deleted"))
    .catch(function (err) {
      if (req.body.id === undefined) {
        res.status(500).send("The id needs to be specified");
      } else {
        res.status(500).send("There is a problem");
      }
    });
};

exports.findByCourseId = async function (req, res) {
  if (req.params.id !== undefined) {
    await Course.findByPk(req.params.id).then((resp) => {
      res.status(200).send(resp.dataValues);
    });
  } else {
    res.status(200).send({ message: "id" });
  }
};
