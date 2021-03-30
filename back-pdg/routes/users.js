var express = require('express');
var router = express.Router();
const authJwt = require("../middleware/authJws");
const controller = require("../controllers/user-controller");

/* GET users listing. */

router.get(
  "/api/teachear",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.adminBoard
);
router.get(
  "/api/teac-asst",
  [authJwt.verifyToken, authJwt.isModerator],
  controller.moderatorBoard
);
router.get(
  "/api/student",
  [authJwt.verifyToken, authJwt.isStudent],
  controller.studentBoard
);
module.exports = router;
