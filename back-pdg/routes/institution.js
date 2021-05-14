var express = require('express');
var router = express.Router();
const authJwt = require("../middleware/authJws");
const institutions_controller = require("../controllers/institution-controller");


router.get(
    "/",
    [authJwt.verifyToken, authJwt.isInst],
    institutions_controller.index
  );


router.post("/",institutions_controller.create);
router.put("/",institutions_controller.update);
router.delete("/",institutions_controller.delete);


module.exports = router;
