import { expressjwt } from "express-jwt";
import { jwtConfig } from "../config/jwtConfig";

export const authenticateJWT = expressjwt({
  secret: jwtConfig.secret || "",
  algorithms: ["HS256"],
}).unless({
  path: [
    { url: "/v1/auth/login", methods: ["POST"] },
    { url: "/", methods: ["GET"] },
  ],
});