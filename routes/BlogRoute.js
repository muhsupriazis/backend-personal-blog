import express from 'express'
import { addNewBlog, deleteBlogById, getAllBlogs, getDataById, updateBlogById } from '../controllers/BlogController.js'

const router = express.Router()

router.get('/', getAllBlogs)
router.get('/:_id', getDataById)
router.post('/', addNewBlog)
router.patch('/:_id', updateBlogById)
router.delete('/:_id', deleteBlogById)

export default router