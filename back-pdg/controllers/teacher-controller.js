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
    return res.status(200).json({
      teacher,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
