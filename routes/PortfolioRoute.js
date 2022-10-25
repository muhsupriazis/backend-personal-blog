import express from 'express'
import { deletePortfolio, getPortfolio, getPortfolios, postPortfolio, updatePortfolio } from '../controllers/PortfolioController.js'
import { verifyToken } from '../middlewares/VerifyToken.js'
const router = express.Router()
router.get('/',  getPortfolios)
router.get('/:id', getPortfolio)
router.post('/', verifyToken, postPortfolio)
router.patch('/:id', verifyToken, updatePortfolio)
router.delete('/:id', verifyToken, deletePortfolio)
export default router
