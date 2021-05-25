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
    const result = await Feedback.create({
      title: req.body.title,
      message: req.body.message,
      date: req.body.date,
      qualification: req.body.qualification,
      teacherId: req.body.teacherId,
      studentId: req.body.studentId,

    })
      .then(() => res.send(result))
      .catch(function (err) {
        if (req.body.courseId === undefined) {
          res.status(500).send("The course needs a name");
        } else {
          res.status(500).send("There is a problem");
        }
      });
  };
