import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || "4000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || "access-secret-change-me",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "refresh-secret-change-me",
    accessExpiresIn: "15m",
    refreshExpiresIn: "7d",
  },
  mysql: {
    host: process.env.MYSQL_HOST || "localhost",
    port: parseInt(process.env.MYSQL_PORT || "3306", 10),
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "root",
    database: process.env.MYSQL_DATABASE || "merchant_db",
  },
  redisUrl: process.env.REDIS_URL || "redis://localhost:6379",
};
