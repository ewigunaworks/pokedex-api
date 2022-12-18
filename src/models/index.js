import config from '../config/database.config.js'
import { DataTypes, Sequelize } from 'sequelize'
import dotenv from 'dotenv'

import userRoles from './user-roles.js'
import users from './users.js'
import monsters from './monsters.js'
import userMonsters from './user-monsters.js'

dotenv.config()

const env = process.env.ENVIRONMENT

const db = {}
let sequelize

if(config[env]) {
  sequelize = new Sequelize(config[env])
} else {
  sequelize = new Sequelize(config[env].database, config[env].username, config[env].password, config[env]);
}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = users(sequelize, Sequelize)
db.userRoles = userRoles(sequelize, Sequelize)
db.monsters = monsters(sequelize, Sequelize)
db.userMonsters = userMonsters(sequelize, Sequelize)

export default db