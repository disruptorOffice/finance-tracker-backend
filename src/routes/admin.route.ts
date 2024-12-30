    import express from 'express'
    const router = express.Router();

    import userRouter from './user.route'
    import typePayment from './type_payment.route'

// Middleware para verificar si el usuario es admin
// function isAdmin(req, res, next) {
//     const userRole = req.headers['x-user-role']; // Ejemplo: el rol se pasa en los headers
//     if (userRole === 'admin') {
//       return next();
//     } else {
//       return res.status(403).json({ message: 'Acceso denegado. Solo para administradores.' });
//     }
//   }

// router.use(isAdmin)


router.use('/users', userRouter);
router.use('/type_payments', typePayment);

export default router