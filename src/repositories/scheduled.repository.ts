import { ScheduledPayment } from '../database/database_define'

export const getAll = async () => {
    return await ScheduledPayment.findAll()
}

export const store = async (scheduledData) => {
    return await ScheduledPayment.create({
        concept: scheduledData.concept,
        frequency_id: scheduledData.frequency_id,
        amount: scheduledData.amount,
        category_id: scheduledData.category_id,
        type_payment_id: scheduledData.type_payment_id,
        billing_day: scheduledData.billing_day,
        user_id: scheduledData.user_id
    })
}
