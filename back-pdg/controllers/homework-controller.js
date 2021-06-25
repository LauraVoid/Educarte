const Homework = require("../model/Homework");
const Student = require("../model/Student");

const getPagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

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

  return res.status(200).json({ result });
};
exports.findHomeWorksByTeacher = async function (req, res, next) {
  const page = parseInt(req.query.page);
  const size = parseInt(req.query.limit);

  const { limit, offset } = getPagination(page, size);

  await Homework.findAll({
    limit,
    offset,
    where: {
      teacherId: req.params.id,
    },
  }).then((result) => {
    return res.status(200).send(result);
  });
};

exports.count = async function (req, res) {
  await Homework.findAll({
    where: {
      teacherId: req.params.id,
    },
  }).then((result) => {
    const total = result.length;
    return res.status(200).json({
      total,
    });
  });
};

exports.delete = async function (req, res) {
  await Homework.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).send({ message: "Homework was success deleted" });
    })
    .catch((error) => {
      console.log(error);
      if (req.params.id === undefined) {
        res.status(406).send("The id needs to be specified");
      } else {
        res.status(406).send("Homework probably to have any course");
      }
    });
};

exports.findHomeWorksByParent = async function (req, res, next) {
  const page = parseInt(req.query.page);
  const size = parseInt(req.query.limit);

  const { limit, offset } = getPagination(page, size);

  const student = await Student.findOne({
    where: {
      parentId: req.params.id,
    },
  });

  await Homework.findAll({
    limit,
    offset,
    where: {
      courseId: student.courseId,
    },
  }).then((result) => {
    return res.status(200).send(result);
  });
};

exports.countforParent = async function (req, res, next) {
  const student = await Student.findOne({
    where: {
      parentId: req.params.id,
    },
  });

  await Homework.findAll({
    where: {
      courseId: student.courseId,
    },
  }).then((result) => {
    const total = result.length;
    return res.status(200).send({
      total,
    });
  });
};
