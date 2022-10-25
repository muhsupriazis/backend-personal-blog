import express from 'express'
import { deleteCertificate, getCerticate, getCertificates, postCertificate, updateCertificate } from '../controllers/CertificateController.js'
import { verifyToken } from '../middlewares/VerifyToken.js'
const router = express.Router()
router.get('/',  getCertificates)
router.get('/:id', getCerticate)
router.post('/', verifyToken, postCertificate)
router.patch('/:id', verifyToken,updateCertificate)
router.delete('/:id', verifyToken,deleteCertificate)
export default router