import {getAll, store}  from '../repositories/category.repository';

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
        return 'Please fill all the fields';
      }

      try {
        return await store(data);
      } catch (error) {
        console.log(error);
      }
      
    }
}