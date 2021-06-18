const Teacher = require("../model/Teacher");
const Parent = require("../model/Parent");
const TeacherCourse = require("../model/Teacher_Course");
const Student = require("../model/Student");
const Course = require("../model/Course");
var bcrypt = require("bcryptjs");
const seq = require("sequelize");
const op = seq.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

exports.index = async function (req, res) {
  const page = parseInt(req.query.page);
  const size = parseInt(req.query.limit);

  const { limit, offset } = getPagination(page, size);

  await Teacher.findAll({ limit, offset }).then((result) => {
    return res.status(200).send(result);
  });
};
exports.all = async function (req, res) {
  await Teacher.findAll({
    where: {
      institutionId: req.params.id,
    },
  }).then((result) => {
    return res.status(200).send(result);
  });
};

exports.count = async function (req, res) {
  await Teacher.findAll().then((result) => {
    const total = result.length;
    return res.status(200).json({
      total,
    });
  });
};

exports.create = async function (req, res, next) {
  try {
    const teacher = await Teacher.create({
      name: req.body.name,
      lastname: req.body.lastname,
      idDocument: req.body.identification,
      phone: req.body.cellphone,
      email: req.body.email,
      password: bcrypt.hashSync("educarte", 8),
      institutionId: req.body.institutionId,
      roleId: 1,
    });
    //console.log(teacher.dataValues.id);
    return res.status(200).json({
      teacher,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(406) //NOT ACCEPTABLE SINCE THE BODY IS WRONG
      .send({ error: "Ha ocurrido un error, intentalo de nuevo" });
  }
};

exports.delete = async function (req, res) {
  console.log(req.params);
  await Teacher.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).send("Teacher was success deleted");
    })
    .catch((error) => {
      console.log(error);
      if (req.params.id === undefined) {
        res.status(406).send("The id needs to be specified");
      } else {
        res.status(406).send("Teacher probably to have any course");
      }
    });
};

exports.update = async function (req, res, next) {
  console.log(req.body);
  await Teacher.update(
    {
      name: req.body.name,
      lastname: req.body.lastname,
      idDocument: req.body.identification,
      phone: req.body.cellphone,
      email: req.body.email,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  )
    .then(() => res.send("The teacher was updated"))
    .catch(function (err) {
      if (req.body.name === undefined) {
        res.status(406).send("The teacher needs a name");
      } else {
        res.status(406).send("There is a problem");
      }
    });
};

exports.findParentsKnown = async function (req, res, next) {
  const students = [];
  const parents = [];
  const coursesFound = await TeacherCourse.findAll({
    where: {
      teacherId: req.params.teacherId,
      courseId: {
        [op.ne]: null,
      },
    },
  });
  if (coursesFound.length !== 0) {
    await Promise.all(
      coursesFound.map(async (course) => {
        await Student.findAll({
          where: {
            courseId: course.courseId,
            parentId: {
              [op.ne]: null,
            },
          },
        }).then((student) => students.push(student));
      })
    );
  } else {
    res
      .status(406)
      .send({ message: "This teacher doesn't have a course assigned" });
  }

  if (students.length !== 0) {
    await Promise.all(
      students.map(async (student) => {
        await Promise.all(
          student.map(async (stu) => {
            await Parent.findOne({
              where: {
                id: stu.parentId,
              },
            }).then((parent) => {
              parents.push(parent);
            });
          })
        );
      })
    );
    res.status(200).send(parents);
  } else {
    res
      .status(406)
      .send({ message: "This course doesn't have students assigned" });
  }
};

exports.findCoursesByTeacher = async function (req, res, next) {
  const courses = [];
  const coursesFound = await TeacherCourse.findAll({
    where: {
      teacherId: req.params.teacherId,
      courseId: {
        [op.ne]: null,
      },
    },
  });

  if (coursesFound !== 0) {
    await Promise.all(
      coursesFound.map(async (course) => {
        await Course.findByPk(course.courseId).then((crs) => courses.push(crs));
      })
    );
    res.status(200).send(courses);
  } else {
    res
      .status(406)
      .send({ message: "This teacher doesn't have a course assigned" });
  }
};

exports.findStudentsByTeacher = async function (req, res, next) {
  const students = [];
  const coursesFound = await TeacherCourse.findAll({
    where: {
      teacherId: req.params.teacherId,
      courseId: {
        [op.ne]: null,
      },
    },
  });

  if (coursesFound !== 0) {
    await Promise.all(
      coursesFound.map(async (course) => {
        await Student.findAll({
          where: {
            courseId: course.courseId,
          },
        }).then((crs) => students.push(crs));
      })
    );
    res.status(200).send(students);
  } else {
    res
      .status(406)
      .send({ message: "This teacher doesn't have a course assigned" });
  }
};
