import express from 'express'
import {FinanceService} from '../services/finance.service'

const financeService = new FinanceService()

const router = express.Router()
router.use(express.json())

router.post('/', async (req, res, next) => {
    try {
        const payload = req.auth; // `req.auth` contiene los datos del token decodificado
        const result = await financeService.storeFinance(req.body, payload)
        res.send(result)
    } catch (error) {
        next(error)
    }
})

export default router