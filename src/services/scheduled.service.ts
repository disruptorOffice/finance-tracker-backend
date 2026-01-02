import { store } from '../repositories/scheduled.repository';
import { ValidationError } from "../errors/custom.errors";

export class ScheduledService {
    async storeScheduled(scheduledData) {
        if (!scheduledData.concept || scheduledData.concept.trim() === "") {
            throw new ValidationError("Concept is required");
        }
        if (!scheduledData.frequency_id) {
            throw new ValidationError("Frequency is required");
        }
        if (!scheduledData.amount || scheduledData.amount == 0) {
            throw new ValidationError("Amount is required");
        }
        if (!scheduledData.category_id) {
            throw new ValidationError("Category is required");
        }
        if (!scheduledData.type_payment_id) {
            throw new ValidationError("Type payment is required");
        }
        if (!scheduledData.billing_day || scheduledData.billing_day.trim() === "") {
            throw new ValidationError("Billing day is required");
        }
        if (!scheduledData.user_id) {
            throw new ValidationError("User ID is required");
        }

        try {
            const newScheduled = await store({
                concept: scheduledData.concept,
                frequency_id: scheduledData.frequency_id,
                amount: scheduledData.amount,
                category_id: scheduledData.category_id,
                type_payment_id: scheduledData.type_payment_id,
                billing_day: scheduledData.billing_day,
                user_id: scheduledData.user_id
            });
            return newScheduled;
        } catch (error) {
            throw error;
        }
    }

    // Obtiene todos los pagos programados cuyo billing_day coincide con el día actual
    async findPaymentsToday(day) {
        // El campo billing_day puede ser '14', '01', etc.
        const { ScheduledPayment } = await import('../database/database_define');
        return await ScheduledPayment.findAll({
            where: {
                billing_day: day
            }
        });
    }

    // Obtiene todos los pagos programados cuyo billing_day coincide con el día actual y sean de tipo mensual
    async findMonthlyPaymentsToday(day) {
        const { ScheduledPayment, PaymentFrequency } = await import('../database/database_define');
        return await ScheduledPayment.findAll({
            where: {
                billing_day: day
            },
            include: [{
                model: PaymentFrequency,
                where: { frequency: 'Mensual' }
            }]
        });
    }

    // Obtiene todos los pagos programados de un usuario con detalles extendidos
    async getAllByUserId(userId) {
        const { ScheduledPayment, Category, TypePayment, PaymentFrequency } = await import('../database/database_define');
        const payments = await ScheduledPayment.findAll({
            where: { user_id: userId },
            include: [
                { model: Category, attributes: ['name'] },
                { model: TypePayment, attributes: ['name'] },
                { model: PaymentFrequency, attributes: ['frequency'] }
            ]
        });
        // Formatear la respuesta según lo solicitado
        return payments.map(payment => {
            const p = payment.get({ plain: true });
            return {
                id: p.id,
                concept: p.concept,
                amount: p.amount,
                category_name: p.Category?.name || null,
                type_payment_name: p.TypePayment?.name || null,
                billing_date: p.billing_day,
                frequency_name: p.PaymentFrequency?.frequency || null
            };
        });
    }

    
    // Elimina un pago programado por su ID
    async deleteById(id) {
        const { ScheduledPayment } = await import('../database/database_define');
        const deleted = await ScheduledPayment.destroy({ where: { id } });
        if (deleted === 0) {
            throw new ValidationError('Scheduled payment not found');
        }
        return { message: 'Scheduled payment deleted successfully' };
    }
}
