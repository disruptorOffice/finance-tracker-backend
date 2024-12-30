import {getAll, getByUsername, store}  from '../repositories/user.repository';
import {getByName}  from '../repositories/role.repository';
import bcrypt from 'bcrypt';
import { ValidationError } from "../errors/custom.errors";
export class UserService {

    async getAllUsers() {
        try {
            return await getAll();
          } catch (error) {
            console.log(error);
          }
    }

    async storeUser(userData) {
      if (!userData.first_name) {
        throw new ValidationError("First name is required");
      }
      if (!userData.last_name) {
        throw new ValidationError("Last name is required");
      }
      if (!userData.username) {
        throw new ValidationError("Username is required");
      }
      if (!userData.password) {
        throw new ValidationError("Password is required");
      }
      const user = await getByUsername(userData.username);
      if(user){
        throw new ValidationError("Username already exists, please choose another one");
      }
      
      const regex = new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$');
      if(!regex.test(userData.password))
        throw new ValidationError("'Password must have at least 8 characters, one uppercase, one lowercase and one number'");
    
      const role = await getByName("user");
      userData.role_id = role[0].dataValues.id;
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
      userData.password = hashedPassword;
      try {
        const newUser = await store(userData)
        newUser.dataValues.password = undefined
        return newUser
      } catch (error) {
        console.log(error);
      }
      
    }
}