import express from 'express'
import {UserService} from '../services/user.service'

const userService = new UserService()

const router = express.Router()
router.use(express.json())

router.post('/', async (req, res, next) => {
    try {
        const result = await userService.storeUser(req.body)
        res.send(result)
    } catch (error) {
        next(error)
    }
})


router.get('/:user_id/finances/:finance_id', async (req, res, next) => {

    const { user_id, finance_id } = req.params
    const payload = req.auth; // `req.auth` contiene los datos del token decodificado
    
    try {
        const result = await userService.retrieveOneFinance(user_id, finance_id, payload)
        res.send(result)
    } catch (error) {
        next(error)
    }
})

router.get('/:user_id/finances', async (req, res, next) => {

    const { user_id } = req.params
    const payload = req.auth; // `req.auth` contiene los datos del token decodificado
    
    try {
        const result = await userService.retrieveFinances(user_id, payload)
        res.send(result)
    } catch (error) {
        next(error)
    }
})

export default router