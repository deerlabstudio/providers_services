'use strict';
module.exports = (sequelize, DataTypes) => {
  const Providers = sequelize.define('Providers', {
    name: DataTypes.STRING,
    contact: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    webpage: DataTypes.STRING,
    principal_phone: DataTypes.STRING,
    contact_phone: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    company: DataTypes.INTEGER
  }, {});
  Providers.associate = function(models) {
    // associations can be defined here
    Providers.hasMany(models.ProvidersAddress, {
      foreignKey: {
        name:"providersId",
        field: "providersId",
        allowNull: true
      }
    });
  };
  return Providers;
};
