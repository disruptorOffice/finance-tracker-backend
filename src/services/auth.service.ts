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
            user_id: user.dataValues.id,
            username: user.dataValues.username,
            role_id: user.dataValues.role_id,
        };

        if (!jwtConfig.secret) {
            throw new ValidationError("JWT secret is not defined")
        }
        const token = Jwt.sign(payload, jwtConfig.secret, {
            expiresIn: jwtConfig.expiresIn,
          });

          const refreshToken = Jwt.sign({
            username: user.dataValues.username,
          }, jwtConfig.secret, {
            expiresIn: "90d",
            });

            

        return {"token": token, "userId": user.dataValues.id, "refreshToken": refreshToken};

    }

    async refreshToken(token: string) {
        
        if (!jwtConfig.secret) {
            throw new ValidationError("JWT secret is not defined")
        }
        
        return new Promise((resolve, reject) => {
            Jwt.verify(token, jwtConfig.secret!, async (err, decoded) => {
                if (err) {
                    reject(new ValidationError("Invalid token"));
                } else {
                    try {
                        
                        const user = await getByUsername((decoded as any).username);
                        const accessToken = Jwt.sign({
                            user_id: user!.dataValues.id,
                            username: user!.dataValues.username,
                            role_id: user!.dataValues.role_id,
                        }, jwtConfig.secret!, {
                            expiresIn: jwtConfig.expiresIn
                        });
                        
                        resolve({"token": accessToken});
                    } catch (error) {
                        reject(error);
                    }
                }
            });
        });
    }
}