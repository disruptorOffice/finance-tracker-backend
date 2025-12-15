import { PaymentFrequency } from '../database/database_define'

export const getAll = async () => {
    return await PaymentFrequency.findAll()
}

export const store = async (frequencyData) => {
    return await PaymentFrequency.create({
        frequency: frequencyData.frequency
    })
}
