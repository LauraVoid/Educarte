const Teacher = require("../model/Teacher");
const Parent = require("../model/Parent");
const Student = require("../model/Student");
const Course = require("../model/Course");
const Teacher_Course = require("../model/Teacher_Course");
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
exports.findTeachersKnown = async function (req, res, next) {
  const student = await Student.findOne({
    where: {
      parentId: req.params.parentId,
    },
  });

  const course = await Course.findOne({
    where: {
      id: student.courseId,
    },
  });

  const teacherCourse = await Teacher_Course.findOne({
    where: {
      courseId: course.id,
    },
  });

  const teacher = await Teacher.findOne({
    where: {
      id: teacherCourse.teacherId,
    },
  });

  res.status(200).send(teacher);
};
