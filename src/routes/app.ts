import express, { Application } from 'express'

import adminRouter from './admin.route'
import userRouter from './user.route'
import authRouter from './auth.route'
import financeRouter from './finance.route'
import categoryRouter from './category.route'

import typePayment from './type_payment.route'
import scheduledRouter from './scheduled.route'
import frequencyRouter from './frequency.route'

export const routes = (app: Application) => {
    const router = express.Router()
    app.use('/v1', router)
    router.use('/users', userRouter)
    router.use('/categories', categoryRouter);
    router.use('/type_payments', typePayment);
    router.use('/admin', adminRouter)
    router.use('/auth', authRouter)
    router.use('/finances', financeRouter)
    router.use('/scheduled', scheduledRouter)
    router.use('/frequencies', frequencyRouter)

    app.use((err, req, res, next) => {
        if (err.name === "UnauthorizedError") {
          // Token inválido o expirado
          return res.status(401).json({ message: "Token inválido o expirado" });
        }
      
        // Otros errores
        return res.status(err.statusCode).json({ message: err.message, stack: err.stack });
      });
}