var express = require("express");
var router = express.Router();
const authJwt = require("../middleware/authJws");
var homework_controller = require("../controllers/homework-controller");

/* POST homework. */
router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],
  homework_controller.create
);

/* GET homework. */
router.get(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  homework_controller.findHomeWorksByTeacher
);

router.get(
  "/count/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  homework_controller.count
);

router.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  homework_controller.delete
);

router.get(
  "/parent/:id",
  [authJwt.verifyToken, authJwt.isParent],
  homework_controller.findHomeWorksByParent
);

router.get(
  "/parent/count/:id",
  [authJwt.verifyToken, authJwt.isParent],
  homework_controller.countforParent
);

module.exports = router;
