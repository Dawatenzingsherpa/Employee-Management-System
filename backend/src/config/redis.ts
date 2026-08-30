import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL!,
});

redisClient.on("error", (error) => {
  console.error(`error : ${error}`);
});

export async function connectRedis() {
  await redisClient.connect();
  console.log("redis connected successfully");
}

export default redisClient;
