import {getAll, store}  from '../repositories/type_payment.repository';
import { ValidationError } from "../errors/custom.errors"
export class TypePaymentService {

    async getAllPayments() {
        try {
            return await getAll();
          } catch (error) {
            console.log(error);
          }
    }

    async storeTypePayment(data) {
      if((!data.name)){
        throw new ValidationError('Please fill all the fields');
      }

      try {
        return await store(data);
      } catch (error) {
        console.log(error);
      }
      
    }
}