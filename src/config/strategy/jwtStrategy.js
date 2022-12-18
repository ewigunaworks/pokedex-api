import jwt from 'jsonwebtoken'

import constant from '../../config/strategy/constant.js'
import db from "../../models/index.js"

const user = db.users
const userRole = db.userRoles

export const validateUser = (req, res, next) => {
  const authorization = req.headers.authorization
  if (authorization) {
    const token = authorization.split(' ')[1]
    jwt.verify(token, constant.secret, function(err, decoded) {
      if (err) throw new Error(err)

      req.user = decoded
      next()
    })
  } else {
    res.status(401).json({code: '401', status:"error", message: 'User unauthorized', data:null})
  }
}

export const isAdmin = (req, res, next) => {
  user.findByPk(req.user.id).then((user) => {
    userRole.findByPk(user.userRoleId).then((role) => {
      if(role.name === 'admin') {
        next()
        return
      } else {
        res.status(401).json({code: '401', status:"error", message: 'User unauthorized', data:null})
      }
    })
  })
}

export const isAuthenticated = (req, res) => {
  const authorization = req.headers.authorization
  if (authorization) {
    const token = authorization.split(' ')[1]
    const authenticated = jwt.verify(token, constant.secret)

    return authenticated
  } else {
    res.status(401).json({code: '401', status:"error", message: 'User unauthorized', data:null})
  }
}