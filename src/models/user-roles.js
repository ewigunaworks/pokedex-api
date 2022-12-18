'use strict';

import { Model } from 'sequelize'
export default (sequelize, DataTypes) => {
  class userRoles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      userRoles.hasOne(models.users, {
        foreignKey: 'userRoleId',
        as: 'userRoles'
      })
    }
  }
  userRoles.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user-roles',
  });
  return userRoles;
};