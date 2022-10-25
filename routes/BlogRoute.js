import express from 'express'
import { deleteBlog, getBlog, getBlogs, postBlog, updateBlog } from '../controllers/BlogController.js'
const router = express.Router()
router.get('/', getBlogs)
router.get('/:_id', getBlog)
router.post('/', postBlog)
router.patch('/:_id', updateBlog)
router.delete('/:_id', deleteBlog)
export default router