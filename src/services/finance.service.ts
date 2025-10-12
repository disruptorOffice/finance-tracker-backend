import {store, getAll}  from '../repositories/finance.repository';
import { ValidationError } from "../errors/custom.errors";

export class FinanceService {

    async storeFinance(financeData, payload) {
        if (!financeData.amount || financeData.amount == 0) {
            throw new ValidationError("Amount is required");
        }
        if (!financeData.type_amount) {
            throw new ValidationError("Type amount is required");
        }
        if (!financeData.category_id) {
            throw new ValidationError("User is required");
        }
        if (!financeData.type_payment_id) {
            throw new ValidationError("Type payment is required");
        }

        if (!financeData.concept) {
            financeData.concept = "";
        }

        let recordDate = null
        if (financeData.date_record) {
            recordDate = financeData.date_record
        } else {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            const hours = String(currentDate.getHours()).padStart(2, '0');
            const minutes = String(currentDate.getMinutes()).padStart(2, '0');
            const seconds = String(currentDate.getSeconds()).padStart(2, '0');
            recordDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }

        try {
            const newFinance = await store(
                {
                    amount: financeData.amount,
                    concept: financeData.concept,
                    type_amount: financeData.type_amount,
                    user_id: payload.user_id,
                    category_id: financeData.category_id,
                    type_payment_id: financeData.type_payment_id,
                    date_record: recordDate
                }
            )
            return newFinance
        } catch (error) {
            console.log(error);
        }
    }

    async adjustedFinances() {
        const finances = await getAll();
        for (let i = 0; i < finances.length; i++) {
            const finance = finances[i];

            await finance.update(
                {
                    date_record: finance.dataValues.createdAt
                }
            )
        }
    }
}