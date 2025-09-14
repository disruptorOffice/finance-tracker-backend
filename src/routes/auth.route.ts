import express from 'express'
import { AuthService } from '../services/auth.service'

const authService = new AuthService()

const router = express.Router()

router.use(express.json())

router.post('/login', async (req, res, next) => {
    try {
        const result = await authService.login(req.body)

        res.cookie('jwt', result.refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.send({token: result.token, userId: result.userId})
    } catch(error) {
        next(error)
    }
})

router.post('/refresh', async (req, res, next) => {
    try {
        if (!req.cookies.jwt) {
            res.status(406).send("No token provided")
        }
        const result = await authService.refreshToken(req.cookies.jwt)
        res.send(result)
    } catch(error) {
        next(error)
    }
})

export default router