import express from 'express'
import UserMonstersController from "../controllers/user-monsters.controller.js";

import { validateUser } from '../../config/strategy/jwtStrategy.js'

const router = express.Router()

const userMonstersController = new UserMonstersController()

router.post('/', validateUser, userMonstersController.catchMonster)
export default router
