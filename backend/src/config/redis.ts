import Redis from "ioredis";
import { config } from "./index";

export const redis = new Redis(config.redisUrl, {
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
});
