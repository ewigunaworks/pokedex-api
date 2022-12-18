import express from 'express'
import UsersController from "../controllers/users.controller.js";
import { isAdmin, validateUser } from '../../config/strategy/jwtStrategy.js';

const router = express.Router()

const usersController = new UsersController()

router.get('/:userId', [validateUser, isAdmin], usersController.findById)
router.get('/', [validateUser, isAdmin], usersController.findAll)
router.delete('/:userId', [validateUser, isAdmin], usersController.delete)
router.put('/:userId', validateUser, usersController.update)
export default router
