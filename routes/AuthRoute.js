import express from 'express'
import { refreshToken, deleteToken } from '../controllers/TokenController.js'
import { login } from '../controllers/UserController.js'
refreshToken
const router = express.Router()
router.post('/login', login)
router.get('/token', refreshToken)
router.delete('/logout', deleteToken)
export default router