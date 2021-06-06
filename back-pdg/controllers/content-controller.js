const Content = require("../model/Content");

/**
 * 
 * @param {*} req 
 * @param {*} res Retorna todo el contenido disponible en la plataforma sin ningun filtro
 * @param {*} next 
 */
exports.index = async function (req, res, next) {
  await Content.findAll().then((result) => {
    res.status(200).send(result);
  });
};
/**
 * 
 * @param {*} req contiene la información que envia el cliente, para filtrar envia el nombre
 * de la categoria por la que se desea filtrar, las opciones son: Lenguaje, Ciencia, Matematicas y Cuerpo
 * @param {*} res Retorna el resultado segun el filtro realizado por el usuario
 * @param {*} next 
 */
exports.filter = async function (req, res, next) {
  await Content.findAll({
    where:{
      category: req.params.cat
    }
  }).then((result) => {
    res.status(200).send(result);
  });
};

