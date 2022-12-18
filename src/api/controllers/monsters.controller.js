import jwt from 'jsonwebtoken'
import _lo from 'lodash'
import { Op } from "sequelize"
import constant from '../../config/strategy/constant.js'
import { isAuthenticated, validateUser } from "../../config/strategy/jwtStrategy.js"
import db from "../../models/index.js"
import userMonsters from '../../models/user-monsters.js'

const monsterModel = db.monsters
const userMonsterModel = db.userMonsters

class MonstersController {
  async findById(req, res, next) {
    const monsterId = req.params.monsterId
    const authorization = req.headers.authorization
    const isAuth = isAuthenticated(req, res)
    const monster = await monsterModel.findByPk(monsterId)
    
    try {
      if(monster) {
        let userMonster = {}
        let result = monster
        if(isAuth) {
          userMonster = await userMonsterModel.findOne({where: {userId: isAuth.id, monsterId: monsterId}})
        }
        
        result['stats'] = JSON.parse(result['stats'])
        result['dataValues']['catched'] = userMonster == null ? false : true
        
        res.json({
          status: 200,
          message: 'Find Monster success',
          data: result
        })
      } else {
        res.json({
          status: 404,
          message: 'Monster not found',
          data: {}
        })
      }
    }catch(err) {
      console.log(">> Error while get data monster: ", err);
      res.json({
        status: 500,
        message: 'Find Monster failed, ' + err,
        data: {}
      })
    }
  }

  async findAll(req, res) {
    const params = req.query
    const page = parseInt(params.page) || 1
    const limit = parseInt(params.limit) || 10
    const offset = limit * (page - 1)
    const searchValue = params.search || ''
    const sortBy = params.sortBy || 'id'
    const orderBy = params.orderBy || 'asc'
    const filterBy = params.filterBy
    const options = params.options
    
    const authorization = req.headers.authorization

    let parameter = {}
    let condition = {}
    let newData = []
    const sort = ['name', 'id']

    // check options catched
    let userMonsterIds = []
    if(authorization) {
      const isAuth = isAuthenticated(req, res)
      const userMonsters = await userMonsterModel.findAll({attributes: ['monsterId'], where: {userId: isAuth.id}})
      userMonsters.map((dt) => userMonsterIds.push(dt['monsterId']))
    }
    if(options == 1) {
      const id = {
          [Op.in]: userMonsterIds
        }

      condition['where'] = {...condition['where'], id}

      parameter['where'] = {...parameter['where'], id}
    } else if(options == 2) {
      const id = {
        [Op.notIn]: userMonsterIds
      }

      condition['where'] = {...condition['where'], id}

      parameter['where'] = {...parameter['where'], id}
    }

    // check sort & order
    if(sortBy && orderBy) {
      if(sort.includes(sortBy)) {
        parameter['order'] = [[sortBy, orderBy]]
      }
    }

    // check search
    if(searchValue) {
      const name = {
        [Op.iLike]: '%'+searchValue+'%'
      }
      condition['where'] = {...condition['where'], name}

      parameter['where'] = {...parameter['where'], name}
    }

    // check filter
    if(filterBy) {
      const type1 = {
        [Op.in]: JSON.parse(filterBy)
      }
      const type2 = {
        [Op.in]: JSON.parse(filterBy)
      }

      condition['where'] = {...condition['where'], [Op.or]: [{type1}, {type2}]}

      parameter['where'] = {...parameter['where'], [Op.or]: [{type1}, {type2}]}
    }
    
    parameter['offset'] = offset
    parameter['limit'] = limit

    try {
      const result = await monsterModel.findAll(parameter)
      if(result) {
        result.map(async (res) => {
          res['stats'] = JSON.parse(res['stats'])
          res['dataValues']['catched'] = false
        })

        if(userMonsterIds.length > 0) {
          userMonsterIds.map((dt) => {
            const monster = _lo.find(result, ['id', dt])
            if(monster) {
              monster['dataValues']['catched'] = true
            }
          })
        }
      }
      
      const totalRows = await monsterModel.count(condition)

      const totalPage = Math.ceil(totalRows / limit)
      return res.json({
        status: 200,
        message: 'Find Monsters success',
        data: {
          result: result,
          page: page,
          limit: limit,
          totalRows: totalRows,
          totalPage: totalPage
        }
      })
    } catch (error) {
      console.log(">> Error while get all data monsters: ", error);
      res.json({
        status: 500,
        message: 'Find Monsters failed, ' + error,
        data: {}
      })
    }
  }

  async create(req, res) {
    const monsterData = {
      name: req.body.name,
      type1: req.body.type1,
      type2: req.body.type2,
      description: req.body.description,
      height: req.body.height,
      weight: req.body.weight,
      stats: JSON.stringify(req.body.stats),
      category: req.body.category,
      image: req.body.image,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    try {
      const result = await monsterModel.create(monsterData)
      if(result) {
        result['stats'] = JSON.parse(result['stats'])
        return res.json({
          status: 200,
          message: 'Create monster success',
          data: result
        })
      } else {
        return res.json({
          status: 500,
          message: 'Create monster failed',
          data: {}
        })
      }
    } catch (error) {
      console.log(">> Error while create monster: ", error);
      return res.json({
        status: 500,
        message: 'Create monster failed, ' + error,
        data: {}
      })
    }
  }

  async update(req, res) {
    const monsterData = {
      name: req.body.name,
      type1: req.body.type1,
      type2: req.body.type2,
      description: req.body.description,
      height: req.body.height,
      weight: req.body.weight,
      stats: JSON.stringify(req.body.stats),
      category: req.body.category,
      image: req.body.image,
      updatedAt: new Date(),
    }
    const monsterId = req.params.monsterId

    try {
      const result = await monsterModel.update(monsterData, {where: {id: monsterId}, returning: true})
      if(result) {
        result[1][0]['stats'] = JSON.parse(result[1][0]['stats'])
        return res.json({
          status: 200,
          message: 'Update monster success',
          data: result[1][0]
        })
      } else {
        return res.json({
          status: 500,
          message: 'Update monster failed',
          data: {}
        })
      }
    } catch (error) {
      console.log(">> Error while update monster: ", error);
      return res.json({
        status: 500,
        message: 'Update monster failed, ' + error,
        data: {}
      })
    }
  }

  async delete(req, res) {
    const monsterId = req.params.monsterId
    const monster = monsterModel.findByPk(monsterId)
    if(monster) {
      try {
        const result = await monsterModel.destroy({where: {id: monsterId}})
        if(result) {
          return res.json({
            status: 200,
            message: 'Delete monster success',
            data: {}
          })
        } else {
          return res.json({
            status: 500,
            message: 'Delete monster failed',
            data: {}
          })
        }
      } catch (error) {
        console.log(">> Error while delete monster: ", error);
        return res.json({
          status: 500,
          message: 'Delete monster failed, ' + error,
          data: {}
        })
      }
    } else {
      return res.json({
        status: 404,
        message: 'Monster not found',
        data: {}
      })
    }
  } 
}

export default MonstersController