'use strict';

import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.belongsTo(models.userRoles, {
        foreignKey: "userRoleId",
        onDelete: "CASCADE"
      })

      users.hasMany(models.userMonsters, {
        foreignKey: "userId",
        as: "users"
      })
    }
  }
  users.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    userRoleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};