import {TypePayment} from '../database/database_define'

export const getAll = async () => {
    return await TypePayment.findAll()
}

export const getById = async (id) => {
    return await TypePayment.findByPk(id)
}

export const store = async (typePaymentData) => {
    return await TypePayment.create({
        name: typePaymentData.name
    })
}