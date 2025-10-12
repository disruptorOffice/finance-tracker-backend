import {FinanceRecord} from '../database/database_define'

export const store = async (financeData) => {
    return await FinanceRecord.create(financeData)
}

export const getAllByUserId = async (userId) => {
    return await FinanceRecord.findAll({ where: { user_id: userId }, include: [ "TypePayment", "Category" ] })
}

export const getOneByUserId = async (userId, financeId) => {
    return await FinanceRecord.findOne({ where: { user_id: userId, id: financeId } })
}

export const getAll = async () => {
    return await FinanceRecord.findAll()
}