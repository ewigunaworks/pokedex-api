import express from 'express'
import AuthController from "../controllers/auth.controller.js";

const router = express.Router()

const authController = new AuthController()

router.post('/register', authController.register)
router.post('/login', authController.authenticate)
export default router
