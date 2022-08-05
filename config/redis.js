import 'dotenv/config'
import session from "express-session";
import connectRedis from "connect-redis";
import { createClient } from "redis";


export const redisStartup = () => {
  let RedisStore = connectRedis(session);
  
  const redisClient = createClient({ 
    legacyMode: true,
    socket:{
      host:process.env.REDIS_URL,
      port:process.env.REDIS_PORT
    }    
  });

  return {
    client: redisClient,
    store: RedisStore,
    session,
  };
  
}

