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
}
