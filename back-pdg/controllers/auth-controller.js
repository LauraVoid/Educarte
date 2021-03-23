const { Sequelize } = require("sequelize");
const db = require("../model/index");
const config = require("../config/auth-config");
const Op = Sequelize.Op;
const Teacher = db.user;
const Student = db.student;
const Role = db.role;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async  (req, res) => {
    
    if(req.body.is === "student"){
      // Add Student.create!!
      Student.create({
        username: req.body.username,
        lastname: req.body.lastname,
        idDocument: req.body.idDocument,
        dateBirthday: req.body.dateBirthday,
        institutionId: req.body.institutionId,
        courseId: req.body.courseId,
        parentId: req.body.parentId,
        roleId: req.body.roleId,
        password: bcrypt.hashSync(req.body.password, 8)
      })
      .then(user => {              
        // user role = 1
        res.status(200).send({ message: "User was registered successfully!" });

    
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
      
    }else if(req.body.is === "teacher"){
      
      await Teacher.create({
            
            email: req.body.email,
            name: req.body.name,
            lastname: req.body.lastname,
            idDocument: req.body.idDocument,
            phone: req.body.phone,
            institutionId: req.body.institutionId,
            roleId: req.body.roleId,
            password: bcrypt.hashSync(req.body.password, 8)
          })
            .then(user => {
              
                  // user role = 1
                  res.status(200).send({ message: "User was registered successfully!" });
  
              
            })
            .catch(err => {
              res.status(500).send({ message: err.message });
            });
        
    }
    
  };
 
  
  exports.signin = (req, res) => {
    Teacher.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
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
            message: "Invalid Password!"
          });
        }
  
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
  
        var authorities = [];
        user.getRoles().then(roles => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
          }
          res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
          });
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };