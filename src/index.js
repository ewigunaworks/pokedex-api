import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import authRoute from './api/routes/auth.route.js'
import userRoute from './api/routes/users.route.js'
import userRoleRoute from './api/routes/user-roles.route.js'
import monsterRoute from './api/routes/monsters.route.js'
import userMonsterRoute from './api/routes/user-monsters.route.js'

dotenv.config()

const app = express()
const port = process.env.PORT

// const userRolesModel = userRoles(sequelize, DataTypes)

// Body parsing Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'))

// app.get('/', async(req: Request, res: Response): Promise<Response> => {
//     return res.status(200).send({ message: `Welcome to the cookbook API! \n Endpoints available at http://localhost:${port}/api/v1` })
// })
app.get('/', function(req, res) {
  res.status(200).json({message: 'Welcome to Pokedex Like API'})
})

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/user-role', userRoleRoute)
app.use('/api/monster', monsterRoute)
app.use('/api/user-monster', userMonsterRoute)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})