import express from 'express'
import {UserService} from '../services/user.service'

const userService = new UserService()

const router = express.Router()
router.use(express.json())


router.get('/', async (req, res) => {
    const result = await userService.getAllUsers()
    res.send(result)
})

router.post('/', async (req, res) => {
    const result = await userService.storeUser(req.body)
    res.send(result)
})

export default router