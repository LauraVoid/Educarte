const { Sequelize } = require("sequelize");
const db = require("../model/index");
const config = require("../config/auth-config");
const Op = Sequelize.Op;
const Teacher = db.user;
const Student = db.student;
const Institution = db.institution;
const Parent= db.parent;
const Role = db.role;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  if (req.body.is === "student") {
    // Add Student.create!!
    console.log("ESTUDIANTE");
    await Student.create({
      name: req.body.name,
      username: req.body.username,
      lastname: req.body.lastname,
      idDocument: req.body.idDocument,
      dateBirthday: req.body.dateBirthday,
      institutionId: req.body.institutionId,
      courseId: req.body.courseId,
      parentId: req.body.parentId,
      roleId: req.body.roleId,
      password: bcrypt.hashSync(req.body.password, 8),
    })
      .then((user) => {
        // user role = 1
        res.status(200).send({ message: "User was registered successfully!" });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } else if (req.body.is === "teacher") {
    await Teacher.create({
      email: req.body.email,
      name: req.body.name,
      lastname: req.body.lastname,
      idDocument: req.body.idDocument,
      phone: req.body.phone,
      institutionId: req.body.institutionId,
      roleId: req.body.roleId,
      password: bcrypt.hashSync(req.body.password, 8),
    })
      .then((user) => {
        // user role = 1
        res.status(200).send({ message: "User was registered successfully!" });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
};

exports.signin = (req, res) => {
  if (req.body.is === "teacher") {
    Teacher.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!",
          });
        }

        var token = jwt.sign({ id: user.id, role:"teacher", name:user.name}, config.secret, {
          expiresIn: 86400, // 24 hours
        });

        res.status(200).send({
          id: user.id,
          institutionId: user.institutionId,
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          roles: user.roleId,
          accessToken: token,
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } else if (req.body.is === "student") {
    Student.findOne({
      where: {
        username: req.body.email,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!",
          });
        }

        var token = jwt.sign({ id: user.id, role:"student", name:user.name }, config.secret, {
          expiresIn: 86400, // 24 hours
        });

        res.status(200).send({
          id: user.id,
          username: user.username,
          roles: user.roleId,
          accessToken: token,
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } else if (req.body.is === "institution") {
    Institution.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: "Institution Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!",
          });
        }

        var token = jwt.sign({ id: user.id, role:"institution", name:user.name }, config.secret, {
          expiresIn: 86400, // 24 hours
        });

        res.status(200).send({
          id: user.id,
          email: user.email,
          name: user.name,
          accessToken: token,
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }else if(req.body.is === "parent"){

    Parent.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: "Institution Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!",
          });
        }

        var token = jwt.sign({ id: user.id, role:"parent", name:user.name+" "+ user.lastname }, config.secret, {
          expiresIn: 86400, // 24 hours
        });

       Student.findOne({
          where:{
            parentId: user.id
          }
        })
        .then((stud)=>{
          res.status(200).send({
            id: user.id,
            email: user.email,
            name: user.name+" "+ user.lastname,
            accessToken: token,
            studentId: stud.id,
            studentName: stud.name +" "+stud.lastname,
            courseId: stud.courseId,
          })
        })

        ;
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });

  }
};
