import express, { Application } from 'express'

import adminRouter from './admin.route'

export const routes = (app: Application) => {
    const router = express.Router()
    app.use('/v1', router)
    router.use('/admin', adminRouter)
}