import {getAll}  from '../repositories/user.repository';
export class UserService {

    async getAllUsers() {
        try {
            return await getAll();
          } catch (error) {
            console.log(error);
          }
    }
}