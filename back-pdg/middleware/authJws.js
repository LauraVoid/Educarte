const jwt = require("jsonwebtoken");
const config = require("../config/auth-config");
const db = require("../model/index");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

 //User.GetRoles() ? verificar como funciona
isAdmin = (req, res, next) => {
  User.findByPk(req.teacherId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "teacher") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require teacher Role!"
      });
      return;
    });
  });
};

isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "teac-assistant") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require teachear assistant Role!"
      });
    });
  });
};

isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "teac-assistant") {
          next();
          return;
        }

        if (roles[i].name === "teacher") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require teachear assistant  or teacher Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
 // isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;
