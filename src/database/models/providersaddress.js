'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProvidersAddress = sequelize.define('ProvidersAddress', {
    first_line: DataTypes.STRING,
    second_line: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    postal_code: DataTypes.STRING,
    default: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN,
    providersId: DataTypes.INTEGER
  }, {});
  ProvidersAddress.associate = function(models) {
    // associations can be defined here
    ProvidersAddress.belongsTo(models.Providers, { as: "provider", foreignKey: { name:"providersId", field: "providersId", allowNull: true }});
  };
  return ProvidersAddress;
};
