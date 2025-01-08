import {FinanceRecord} from '../database/database_define'

export const store = async (financeData) => {
    return await FinanceRecord.create(financeData)
}