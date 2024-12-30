import { getByUsername } from "../repositories/user.repository";
import bcrypt from 'bcrypt';
import Jwt  from "jsonwebtoken";
import { jwtConfig } from "../config/jwtConfig";
import { ValidationError } from "../errors/custom.errors"

export class AuthService {
  
    async login(loginData: any) {
        const { username, password } = loginData;

        const user = await getByUsername(username);

        if (!user) {
            throw new ValidationError("Invalid credentials, please try again");
        }

        const isMatch = await bcrypt.compare(password, user.dataValues.password)
        if (!isMatch) {
            throw new ValidationError("Invalid credentials, please try again")
        }

        const payload = {
            id: user.dataValues.id,
            username: user.dataValues.username,
            role: user.dataValues.role_id,
        };

        if (!jwtConfig.secret) {
            throw new ValidationError("JWT secret is not defined")
        }
        const token = Jwt.sign(payload, jwtConfig.secret, {
            expiresIn: jwtConfig.expiresIn,
          });

        return {"token": token};

    }
}