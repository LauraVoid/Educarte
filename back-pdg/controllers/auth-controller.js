const { Sequelize } = require("sequelize");
const db = require("../model/index");
const config = require("../config/auth-config");
const Op = Sequelize.Op;
const Teacher = db.user;
const Role = db.role;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // Save User to Database
    // Add Student.create!!
    if(req.body.is === "student"){
      Teacher.create({
            username: req.body.username,
            email: req.body.name,
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
              if (req.body.roles) {
                Role.findAll({
                  where: {
                    name: {
                      [Op.or]: req.body.roles
                    }
                  }
                }).then(roles => {
                  //addRoles
                  user.setRoles(roles).then(() => {
                    res.send({ message: "User was registered successfully!" });
                  });
                });
              } else {
                // user role = 1
                res.send({ message: "User was registered successfully! " });

              }
            })
            .catch(err => {
              res.status(500).send({ message: err.message });
            });

    }else if(req.body.is === "teacher"){
      console.log("re.body", req.body.is)
      Teacher.create({
            
            email: req.body.name,
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
                  res.send({ message: "User was registered successfully! bienvenido" });
  
              
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