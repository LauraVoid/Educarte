const Feedback = require("../model/Feedback");

exports.index = async function (req, res, next) {
  await Feedback.findAll({
    where: {
        studentId: req.params.EstId
      }
    }).then((result) => {
    res.status(200).send(result);
  });
};

exports.create = async function (req, res, next) {
    await Feedback.create({
      title: req.body.title,
      message: req.body.message,
      date: req.body.date,
      qualification: req.body.qualification,
      teacherId: req.body.teacherId,
      studentId: req.body.studentId,

    })
      .then((result) => res.send(result))
      .catch(function (err) {
       console.log(err)
      });
  };
