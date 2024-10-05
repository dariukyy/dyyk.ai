import { RATE_LIMIT_TIME, REQ_LIMIT } from "@/constants/rateLimitTime";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_SECRET!,
});

export const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(REQ_LIMIT, RATE_LIMIT_TIME),
  prefix: "@upstash/ratelimit",
});
