const Teacher = require("../model/Teacher");

exports.index = async function (req, res) {
  await Teacher.findAll().then((result) => {
    res.send(result);
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
