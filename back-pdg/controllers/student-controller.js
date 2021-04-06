const Student = require("../model/Student");
const Parent = require("../model/Parent");

exports.index = async function (req, res, next) {
  await Student.findAll().then((result) => {
    res.send(result);
  });
};

exports.create = async function (req, res, next) {
  try {
    const parent = await Parent.create({
      name: req.body.nameParent,
      lastname: req.body.lastnameParent,
      idDocument: req.body.idDocumentParent,
      email: req.body.email,
      password: "educarte",
      phone: req.body.phone,
      institutionId: req.body.institutionId,
    });

    let parentId = parent.dataValues.id;

    const student = await Student.create({
      name: req.body.nameStudent,
      lastname: req.body.lastnameStudent,
      idDocument: req.body.idDocumentStudent,
      username: req.body.username,
      password: "educarte",
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
