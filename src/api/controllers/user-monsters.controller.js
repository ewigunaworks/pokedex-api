import db from "../../models/index.js"

const userMonsterModel = db.userMonsters

class UserMonstersController {
  async catchMonster(req, res) {
    const {monsterId} = req.body
    const userId = req.user.id

    try {
      const checkUserMonster = await userMonsterModel.findOne({where: {userId: userId, monsterId: monsterId}})
      if(checkUserMonster) {
        const result = await userMonsterModel.destroy({where: {userId: userId, monsterId: monsterId}})
        res.json({
          status: 200,
          message: 'Release monster success',
          data: {}
        })
      } else {
        const userMonsterData = {
          userId: userId,
          monsterId: monsterId,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        const result = await userMonsterModel.create(userMonsterData)
        res.json({
          status: 200,
          message: 'Catch monster success',
          data: result
        })
      }
    } catch (error) {
      res.json({
        status: 500,
        message: 'Update catching monster failed, ' + error,
        data: {}
      })
    }
  }
}

export default UserMonstersController