const Message = require("../model/Message");
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
