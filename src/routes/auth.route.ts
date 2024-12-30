import express from 'express'
import { AuthService } from '../services/auth.service'

const authService = new AuthService()

const router = express.Router()

router.use(express.json())

router.post('/login', async (req, res, next) => {
    try {
        const result = await authService.login(req.body)
        res.send(result)
    } catch(error) {
        next(error)
    }
})

export default router