import express from 'express'
import MonstersController from "../controllers/monsters.controller.js";

import { isAdmin, validateUser } from '../../config/strategy/jwtStrategy.js'

const router = express.Router()

const monstersController = new MonstersController()

router.get('/:monsterId', monstersController.findById)
router.get('/', monstersController.findAll)

router.delete('/:monsterId', [validateUser, isAdmin], monstersController.delete)
router.post('/', [validateUser, isAdmin], monstersController.create)
router.put('/:monsterId', [validateUser, isAdmin], monstersController.update)
export default router
