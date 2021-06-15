const jwt = require("jsonwebtoken");
const config = require("../config/auth-config");
const db = require("../model/index");
const User = db.user;
const Student = db.student;
const Institution = db.institution;
const Parent = db.parent;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    if (user.roleId === 1) {
      next();
      return;
    }

    res.status(403).send({
      message: "Require teacher Role!",
    });
    return;
  });
};

isInst = (req, res, next) => {
  Institution.findByPk(req.userId).then((user) => {
    try {
      if (user.institutionId !== 0) {
        next();
        return;
      }
    } catch {
      res.status(403).send({
        message: "Require institution Role!",
      });
      return;
    }

    res.status(403).send({
      message: "Require institution Role!",
    });
    return;
  });
};

isModerator = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    if (user.roleId === 2) {
      next();
      return;
    }

    res.status(403).send({
      message: "Require teacher assistant Role!",
    });
    return;
  });
};

isStudent = (req, res, next) => {
  Student.findByPk(req.userId).then((user) => {
    if (user.roleId === 3) {
      next();
      return;
    }

    res.status(403).send({
      message: "Require student Role!",
    });
    return;
  });
};

isParent = (req, res, next) => {
  Parent.findByPk(req.userId).then((user) => {
    if (user.parentId !== 0) {
      next();
      return;
    }

    res.status(403).send({
      message: "Require parent Role!",
    });
    return;
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isStudent: isStudent,
  isInst: isInst,
  isParent: isParent,
  // isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;
