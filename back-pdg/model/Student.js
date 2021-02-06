const { Sequelize, SequelizeScopeError } = require("sequelize");
const sequelize = require("../config/Sequelize");

module.exports = sequelize.define("Student", {
  id: {
    type: Sequelize.SMALLINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  idDocument: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dateBirthday: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
