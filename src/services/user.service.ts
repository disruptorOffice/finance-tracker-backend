import {SequelConfig} from "../config/sequelizeConfig";

import {Sequelize} from "sequelize";

export class UserService {

    async getUsers() {
        try {
          // conect to the database
            // const sequelize = new Sequelize(
            //   SequelConfig.DB as string,
            //   SequelConfig.USER as string,
            //   SequelConfig.PASSWORD as string,
            //   {
            //     host: SequelConfig.HOST as string,
        
            //     dialect: SequelConfig.dialect as any,
            //     port: SequelConfig.port as any,
            //   }
            // );

            //retunr list of users fake
            return [
                {
                  id: 1,
                  name: "John Doe",
                  email: "as",
                },
                {
                  id: 2,
                  name: "Jane Doe",
                  email: "as",
                },
              ];
          } catch (error) {
            console.log(error);
          }
    }
}