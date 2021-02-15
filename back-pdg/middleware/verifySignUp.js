const db = require("../model/index");
const ROLES = db.ROLES;
const User = db.user;
const Role = require("../model/Role")


checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! username is already in use!"
        });
        return;
      }
  
      // Email
      User.findOne({
        where: {
          email: req.body.email
        }
      }).then(user => {
        if (user) {
          res.status(400).send({
            message: "Failed! Email is already in use!"
          });
          return;
        }
  
        next();
      });
    });
  };
  
  checkRolesExisted = (req, res, next) => {
    if (req.body.roleId) {    
       var result = Role.findOne({
        where:{
          roleId:req.body.roleId
        }
      })
        if (! result) {
          res.status(400).send({
            message: "Failed! Role does not exist = " + req.body.role
          });
          return;
        }
      
    }
    
    next();
  };
  
  const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
  };
  
  module.exports = verifySignUp;