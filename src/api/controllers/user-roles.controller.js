import db from "../../models/index.js"

const userRoleModel = db.userRoles

class UserRolesController {
  async findById(req, res) {
    const userRoleId = req.params.userRoleId
    try {
      const result = await userRoleModel.findByPk(userRoleId)
      if(result) {
        return res.json({
          status: 200,
          message: 'Find User role by ID success',
          data: result
        })
      } else {
        return res.json({
          status: 404,
          message: 'User role by ID not found',
          data: {}
        })
      }
    } catch (err) {
      console.log(">> Error while get data user roles by id: ", err);
      return res.json({
        status: 500,
        message: 'Find User role by ID failed, ' + err,
        data: {}
      })
    }
  }

  async findAll(req, res) {
    try {
      const result = await userRoleModel.findAll()
      if(result) {
        return res.json({
          status: 200,
          message: 'Find User roles success',
          data: result
        })
      } else {
        return res.json({
          status: 404,
          message: 'User roles not found',
          data: {}
        })
      }
    } catch (err) {
      console.log(">> Error while get all data user roles: ", err);
      return res.json({
        status: 500,
        message: 'Find User roles failed, ' + err,
        data: {}
      })
    }
  }

  async create(req, res) {
    const userRoleData = {
      name: req.body.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    try {
      const result = await userRoleModel.create(userRoleData)
      if(result) {
        return res.json({
          status: 200,
          message: 'Create User role success',
          data: result
        })
      } else {
        return res.json({
          status: 500,
          message: 'Create User role failed',
          data: {}
        })
      }
    } catch (err) {
      console.log(">> Error while create user role: ", err);
      return res.json({
        status: 500,
        message: 'Create User role failed, ' + err,
        data: {}
      })
    }
  }

  async update(req, res) {
    const userRoleData = {
      name: req.body.name,
      updatedAt: new Date(),
    }
    const userRoleId = req.params.userRoleId

    try {
      const result = await userRoleModel.update(userRoleData, {where: {id: userRoleId}, returning: true})
      if(result) {
        return res.json({
          status: 200,
          message: 'Update User role success',
          data: result[1]
        })
      } else {
        return res.json({
          status: 500,
          message: 'Update User role failed',
          data: {}
        })
      }
    } catch (err) {
      console.log(">> Error while update user role: ", err);
      return res.json({
        status: 500,
        message: 'Update User role failed, ' + err,
        data: {}
      })
    }
  }

  async delete(req, res) {
    const userRoleId = req.params.userRoleId
    const userRole = await userRoleModel.findByPk(userRoleId)
    if(userRole) {
      try {
        const result = await userRoleModel.destroy({where: {id: userRoleId}})
        if(result) {
          return res.json({
            status: 200,
            message: 'Delete User role success',
            data: {}
          })
        } else {
          return res.json({
            status: 500,
            message: 'Delete User role failed',
            data: {}
          })
        }
      } catch (err) {
        console.log(">> Error while delete user role: ", err);
        return res.json({
          status: 500,
          message: 'Delete User role failed, ' + err,
          data: {}
        })
      }
    } else {
      return res.json({
        status: 404,
        message: 'User role not found',
        data: {}
      })
    }
  }
}

export default UserRolesController