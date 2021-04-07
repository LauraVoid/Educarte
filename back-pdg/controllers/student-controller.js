const Student = require("../model/Student");
const Parent = require("../model/Parent");
var bcrypt = require("bcryptjs");

const getPagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

exports.index = async function (req, res) {
  const page = parseInt(req.query.page);
  const size = parseInt(req.query.limit);

  const { limit, offset } = getPagination(page, size);

  await Student.findAll({ limit, offset }).then((result) => {
    return res.status(200).send(result);
  });
};

exports.count = async function (req, res) {
  await Student.findAll().then((result) => {
    const total = result.length;
    return res.status(200).json({
      total,
    });
  });
};

exports.create = async function (req, res, next) {
  try {
    const parent = await Parent.create({
      name: req.body.nameParent,
      lastname: req.body.lastnameParent,
      idDocument: req.body.idDocumentParent,
      email: req.body.email,
      password: bcrypt.hashSync("educarte", 8),
      phone: req.body.phone,
      institutionId: req.body.institutionId,
    });

    let parentId = parent.dataValues.id;

    const student = await Student.create({
      name: req.body.nameStudent,
      lastname: req.body.lastnameStudent,
      idDocument: req.body.idDocumentStudent,
      username: req.body.username,
      password: bcrypt.hashSync("educarte", 8),
      dateBirthday: req.body.dateBirthday,
      parentId: parentId,
      courseId: req.body.courseId,
      institutionId: req.body.institutionId,
      roleId: req.body.roleId,
    });

    return res.status(200).json({ student });
  } catch (error) {
    console.log(error);
    return res
      .status(406) //NOT ACCEPTABLE SINCE THE BODY IS WRONG
      .send({ error: "Ha ocurrido un error, intentalo de nuevo" });
  }
};

exports.delete = async function (req, res) {
  await Student.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).send({ message: "Student was success deleted" });
    })
    .catch((error) => {
      console.log(error);
      if (req.params.id === undefined) {
        res.status(406).send("The id needs to be specified");
      } else {
        res.status(406).send("Student probably to have any course");
      }
    });
};

exports.assignToCourse = async function (req, res, next) {
  const students = req.body.students;

  await students.forEach((student) => {
    Student.update(
      {
        courseId: req.body.courseId,
      },
      {
        where: {
          id: student.id,
        },
      }
    ).catch(function (err) {
      res.status(500).send("There is a problem");
    });
  });
  res.status(200).send({ message: "The students was assigned" });
};
