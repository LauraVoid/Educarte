const Content = require("../model/Content");

exports.index = async function (req, res, next) {
  await Content.findAll().then((result) => {
    res.status(200).send(result);
  });
};

exports.filter = async function (req, res, next) {
  await Content.findAll({
    where:{
      category: req.params.cat
    }
  }).then((result) => {
    res.status(200).send(result);
  });
};

