'use strict';

import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class userMonsters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      userMonsters.belongsTo(models.users, {
        foreignKey: "userId"
      })

      userMonsters.belongsTo(models.monsters, {
        foreignKey: "monsterId"
      })
    }
  }
  userMonsters.init({
    userId: DataTypes.INTEGER,
    monsterId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user-monsters',
  });
  return userMonsters;
};