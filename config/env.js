import dotenv from "dotenv";
dotenv.config();

export const config = {
  jwtSecret: process.env.JWT_SECRET,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
};
