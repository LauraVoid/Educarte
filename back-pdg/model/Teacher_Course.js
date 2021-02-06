const { Sequelize } = require("sequelize");
const sequelize = require("../config/Sequelize");

module.exports = sequelize.define("Teacher_Course", {
  id: {
    type: Sequelize.SMALLINT,
    primaryKey: true,
    autoIncrement: true,
  },
});
