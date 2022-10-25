import express from 'express'
import { deleteBlog, getBlog, getBlogs, postBlog, updateBlog } from '../controllers/BlogController.js'
import { verifyToken } from '../middlewares/VerifyToken.js'
const router = express.Router()
router.get('/', getBlogs)
router.get('/:_id', getBlog)
router.post('/', verifyToken, postBlog)
router.patch('/:_id', verifyToken, updateBlog)
router.delete('/:_id', verifyToken, deleteBlog)
export default router