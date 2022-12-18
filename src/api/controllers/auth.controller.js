import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import constant from '../../config/strategy/constant.js'
import db from "../../models/index.js"

const userModel = db.users
const userRoleModel = db.userRoles
const saltRound = 10

class AuthController {
  async register(req, res) {
    const userData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
      username: req.body.username,
      userRole: req.body.userRole, 
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // get userrole_id
    const userRole = await userRoleModel.findOne({where: {name: userData['userRole'].toLowerCase()}})
    // save user data
    userData['password'] = bcrypt.hashSync(userData['password'], saltRound)
    userData['userRoleId'] = userRole['id']

    try {
      const result = await userModel.create(userData)

      return res.json({
          status: 200,
          message: 'Register user success',
          data: result
        })
    } catch (error) {
      res.json({
        status: 500,
        message: 'Register user failed, ' + err,
        data: {}
      })
    }
  }

  async authenticate(req, res) {
    try {
      const user = await userModel.findOne({where: {username: req.body.username}})
  
      if(user == null) {
        return res.json({
          status: 404,
          message: 'User not found',
          data: null
        })
      }
  
      if(user) {
        // check user role
        const checkUserRole = await userRoleModel.findOne({where: {id: user['userRoleId']}})
        
        if(checkUserRole) {
          const userDt = {
            firstname: user['firstname'],
            lastname: user['lastname'],
            username: user['username'],
            userRole: checkUserRole,
            createdAt: user['createdAt'],
            updatedAt: user['updatedAt'],
          }

          if(bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({id: user.id}, constant.secret, {expiresIn: '1h'})

            return res.json({
              status: 200,
              message: 'User authenticated',
              data: {
                user: userDt,
                token: token,
              }
            })
          } else {
            return res.json({
              status: 500,
              message: 'Invalid username/password',
              data: {}
            })
          }
        } else {
          return res.json({
            status: 401,
            message: 'User unauthorize',
            data: null
          })
        }
      }
    } catch (error) {
      res.json({
        status: 500,
        message: 'Error: ' + error,
        data: {}
      })
    }
  }
}

export default AuthController