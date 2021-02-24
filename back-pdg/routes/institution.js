var express = require('express');
var router = express.Router();
var institutions_controller = require("../controllers/institution-controller");

/* GET home page. */
router.get("/",institutions_controller.index);
router.post("/",institutions_controller.create);
router.put("/",institutions_controller.update);
router.delete("/",institutions_controller.delete);

module.exports = router;
