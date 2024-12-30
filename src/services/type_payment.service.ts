import {getAll, store}  from '../repositories/type_payment.repository';
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
        return 'Please fill all the fields';
      }

      try {
        return await store(data);
      } catch (error) {
        console.log(error);
      }
      
    }
}