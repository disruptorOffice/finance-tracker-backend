import {store}  from '../repositories/finance.repository';
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

        try {
            const newFinance = await store(
                {
                    amount: financeData.amount,
                    concept: financeData.concept,
                    type_amount: financeData.type_amount,
                    user_id: payload.user_id,
                    category_id: financeData.category_id,
                    type_payment_id: financeData.type_payment_id
                }
            )
            return newFinance
        } catch (error) {
            console.log(error);
        }
    }
}