import express from 'express'
import { validateUser } from '../../config/strategy/jwtStrategy.js';
import UserRolesController from "../controllers/user-roles.controller.js";

const router = express.Router()

const userRolesController = new UserRolesController()

router.get('/:userRoleId', validateUser, userRolesController.findById)
router.get('/', validateUser, userRolesController.findAll)
router.delete('/:userRoleId', validateUser, userRolesController.delete)
router.post('/', validateUser, userRolesController.create)
router.put('/:userRoleId', validateUser, userRolesController.update)
export default router
