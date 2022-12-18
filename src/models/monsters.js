'use strict';

import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class monsters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      monsters.hasMany(models.userMonsters, {
        foreignKey: "monsterId",
        as: "monsters"
      })
    }
  }
  monsters.init({
    name: DataTypes.STRING,
    type1: DataTypes.STRING,
    type2: DataTypes.STRING,
    description: DataTypes.TEXT,
    height: DataTypes.FLOAT,
    weight: DataTypes.FLOAT,
    stats: DataTypes.TEXT,
    category: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'monsters',
  });
  return monsters
}