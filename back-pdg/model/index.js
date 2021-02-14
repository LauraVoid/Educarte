const { Sequelize } = require("sequelize");
const sequelize = require("../config/Sequelize");
const db = {};

db.user = require("./Teacher_Course")(sequelize, Sequelize);
db.role = require("./Role")(sequelize, Sequelize);
db.ROLES = ["teacher", "teac-assistant"];

module.exports = db;