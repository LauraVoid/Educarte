const Homework = require("../model/Homework");

exports.create = async function (req, res, next) {
  const result = await Homework.create({
    title: req.body.title,
    endDate: req.body.endDate,
    message: req.body.message,
    skill: req.body.skill,
    attached: req.body.attached,
    courseId: req.body.courseId,
    teacherId: req.body.teacherId,
  });
};
