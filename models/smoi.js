console.log("smoi.js");
module.exports = (sequelize, DataTypes) => {
  var Smoi = sequelize.define("smoi", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    smoi_name: DataTypes.STRING,
    smoi_category: DataTypes.STRING,
    smoi_image: DataTypes.TEXT
  });
  return Smoi;
};
