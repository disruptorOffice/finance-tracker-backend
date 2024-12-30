import { config } from "./../config/envConfig";

export const jwtConfig = {
    secret: config.jwt.secret,
    expiresIn: config.jwt.expiresIn,
  };