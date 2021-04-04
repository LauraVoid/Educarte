const Teacher = require("../model/Teacher");
const Course = require("../model/Course");

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
      password: "educarte",
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
