import express from 'express'
import { deleteUser, getUser,  postUser } from '../controllers/UserController.js'
import { verifyToken } from '../middlewares/VerifyToken.js'
const router = express.Router()
router.get('/', verifyToken, getUser)
router.post('/', postUser)
router.delete('/:id', verifyToken, deleteUser)
export default router