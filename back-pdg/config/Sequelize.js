const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USERN,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: "postgres",
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
  }
);

sequelize.sync({ force: false }).then(() => {
  console.log("Tablas sincronizadas");
});

module.exports = sequelize;
