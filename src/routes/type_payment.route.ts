import express from 'express'
import {TypePaymentService} from '../services/type_payment.service'

const paymentService = new TypePaymentService()

const router = express.Router()
router.use(express.json())


router.get('/', async (req, res) => {
    const result = await paymentService.getAllPayments()
    res.send(result)
})

export default router