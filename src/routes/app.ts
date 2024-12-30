import express, { Application } from 'express'

import adminRouter from './admin.route'
import userRouter from './user.route'
import authRouter from './auth.route'

export const routes = (app: Application) => {
    const router = express.Router()
    app.use('/v1', router)
    router.use('/users', userRouter)
    router.use('/admin', adminRouter)
    router.use('/auth', authRouter)
}