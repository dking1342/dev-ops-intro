import 'dotenv/config'
import session from "express-session";
import connectRedis from "connect-redis";
import { createClient } from "redis";


export const redisStartup = (app) => {
  let RedisStore = connectRedis(session);
  
  const redisClient = createClient({ 
    legacyMode: true,
    socket:{
      host:process.env.REDIS_URL,
      port:process.env.REDIS_PORT
    }    
  });


  redisClient.connect()
    .then(()=> {
      console.log("redis connected")
      app.use(
        session({
          store: new RedisStore({client:redisClient}),
          saveUninitialized: false,
          secret: process.env.REDIS_SECRET,
          resave: false,
          cookie:{
            secure:false,
            httpOnly:true,
            maxAge: 30000
          }
        })
      )
    })
    .catch((err)=>{
      console.log("redis error:",err.message)
      setTimeout(redisStartup,5000);
    });
  
}

