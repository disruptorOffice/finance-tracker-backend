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

export default router