module.exports = (sequelize, type) => {
  const Institution = sequelize.define("Institution", {
    id: {
      type: type.SMALLINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: type.STRING,
    email: type.STRING,
    password: type.STRING,
  });
  return Institution;
};
