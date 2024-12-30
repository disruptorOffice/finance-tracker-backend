import {getAll, store}  from '../repositories/category.repository';
import { ValidationError } from "../errors/custom.errors"

export class CategoryService {

    async getAllCategories() {
        try {
            return await getAll();
          } catch (error) {
            console.log(error);
          }
    }

    async storeCategory(data) {
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