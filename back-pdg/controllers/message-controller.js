const Message = require("../model/Message");
const Parent = require("../model/Parent");
const Teacher = require("../model/Teacher");
var bcrypt = require("bcryptjs");
const seq = require("sequelize");
const op = seq.Op;

exports.create = async function (req, res, next) {
  try {
    const messageS = await Message.create({
      title: req.body.title,
      date: req.body.date,
      message: req.body.message,
      roleReceiver: req.body.roleReceiver,
      receiver: req.body.receiver,
      teacherId: req.body.teacher,
      parentId: req.body.parent,
      courseId: req.body.course,
    });
    //console.log(teacher.dataValues.id);
    return res.status(200).json({
      messageS,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(406) //NOT ACCEPTABLE SINCE THE BODY IS WRONG
      .send({ error: "Ha ocurrido un error, intentalo de nuevo" });
  }
};

exports.countMessagesTeacher = async function (req, res, next) {
  try {
    await Message.findAll({
      where: {
        roleReceiver: "teacher",
        receiver: req.params.teacherId,
      },
    }).then((result) => {
      const total = result.length;
      return res.status(200).json({
        total,
      });
    });
  } catch (err) {
    console.log(err);
  }
};

exports.countMessagesParent = async function (req, res, next) {
  try {
    await Message.findAll({
      where: {
        roleReceiver: "parent",
        receiver: req.params.parentId,
      },
    }).then((result) => {
      const total = result.length;
      return res.status(200).json({
        total,
      });
    });
  } catch (err) {
    console.log(err);
  }
};

exports.findAllMessagesTeacher = async function (req, res, next) {
  const messagesTotal = [];
  try {
    await Message.findAll({
      where: {
        roleReceiver: "teacher",
        receiver: req.params.teacherId,
      },
    }).then(async (result) => {
      await Promise.all(
        await result.map(async (message) => {
          if (message.parentId !== null) {
            const objP = await Parent.findByPk(message.parentId);
            const union = { message, ...objP };
            messagesTotal.push(union);
          }
        })
      );
      return res.status(200).json({
        messagesTotal,
      });
    });
  } catch (err) {
    console.log(err);
  }
};

exports.findAllMessagesParent = async function (req, res, next) {
  const messagesTotal = [];
  try {
    await Message.findAll({
      where: {
        roleReceiver: "parent",
        receiver: req.params.parentId,
      },
    }).then(async (result) => {
      await Promise.all(
        await result.map(async (message) => {
          if (message.teacherId !== null) {
            const objP = await Teacher.findByPk(message.teacherId);
            const union = { message, ...objP };
            messagesTotal.push(union);
          }
        })
      );
      return res.status(200).json({
        messagesTotal,
      });
    });
  } catch (err) {
    console.log(err);
  }
};
