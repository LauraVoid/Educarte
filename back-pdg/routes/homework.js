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
  "/course/:id",homework_controller.findTaskByCourseId
);

module.exports = router;
