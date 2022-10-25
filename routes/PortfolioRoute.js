import express from 'express'
import { deletePortfolio, getPortfolio, getPortfolios, postPortfolio, updatePortfolio } from '../controllers/PortfolioController.js'
const router = express.Router()
router.get('/', getPortfolios)
router.get('/:id', getPortfolio)
router.post('/', postPortfolio)
router.patch('/:id', updatePortfolio)
router.delete('/:id', deletePortfolio)
export default router
