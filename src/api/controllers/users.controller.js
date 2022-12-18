import bcrypt from 'bcrypt'
import db from "../../models/index.js"

const userModel = db.users
const saltRound = 10

class UsersController {
  async findById(req, res) {
    const userId = req.params.userId
    try {
      const result = await userModel.findByPk(userId)
      if(result) {
        delete result['dataValues']['password']
        return res.json({
          status: 200,
          message: 'Find User by ID success',
          data: result
        })
      } else {
        return res.json({
          status: 404,
          message: 'User by ID not found',
          data: {}
        })
      }
    } catch (err) {
      console.log(">> Error while get data user by id: ", err);
      return res.json({
        status: 500,
        message: 'Find User by ID failed, ' + err,
        data: {}
      })
    }
  }

  async findAll(req, res) {
    try {
      const result = await userModel.findAll()
      if(result) {
        result.map((dt) => {
          delete dt['dataValues']['password']
        })
        return res.json({
          status: 200,
          message: 'Find Users success',
          data: result
        })
      } else {
        res.json({
          status: 404,
          message: 'Users not found',
          data: {}
        })
      }
    } catch (err) {
      console.log(">> Error while get all data user: ", err);
      return res.json({
        status: 500,
        message: 'Find Users failed, ' + err,
        data: {}
      })
    }
  }

  async update(req, res) {
    const userData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, saltRound),
      updatedAt: new Date(),
    }
    const userId = req.params.userId

    try {
      const result = await userModel.update(userData, {where: {id: userId}, returning: true})
      if(result) {
        return res.json({
          status: 200,
          message: 'Update User success',
          data: result[1]
        })
      } else {
        return res.json({
          status: 500,
          message: 'Update User failed',
          data: {}
        })
      }
    } catch (err) {
      console.log(">> Error while update user: ", err);
      return res.json({
        status: 500,
        message: 'Update User failed, ' + err,
        data: {}
      })
    }
  }

  async delete(req, res) {
    const userId = req.params.userId
    const user = await userModel.findByPk(userId)
    if(user) {
      try {
        const result = await userModel.destroy({where: {id: userId}})
        if(result) {
          return res.json({
            status: 200,
            message: 'Delete User success',
            data: result
          })
        } else {
          return res.json({
            status: 500,
            message: 'Delete User failed',
            data: {}
          })
        }
      } catch (err) {
        console.log(">> Error while delete user: ", err);
        return res.json({
          status: 500,
          message: 'Delete User failed, ' + err,
          data: {}
        })
      }
    } else {
      return res.json({
        status: 404,
        message: 'User not found',
        data: {}
      })
    }
  }
}

export default UsersController