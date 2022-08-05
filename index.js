import 'dotenv/config'
import express from "express";
import cors from "cors";
import { mongoStartup } from './config/mongodb.js';
import UserRouter from './routes/usersRoutes.js';
import { redisStartup } from './config/redis.js';
import PostRouter from './routes/postRoutes.js';

// variables
const PORT = process.env.PORT || 5001;

// express init and middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

// init db
mongoStartup()

// init redis
let { client, store, session } = redisStartup();
client.connect()
  .then(()=> console.log("redis connected"))
  .catch((err)=>console.log("redis error",err.message));

app.use(
  session({
    store: new store({client}),
    secret: process.env.REDIS_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie:{
      secure:false,
      httpOnly:true,
      maxAge: 3000000,
    }
  })
)

// routes
app.use("/users",UserRouter);
app.use("/posts",PostRouter);

// server init
app.listen(PORT,()=>console.log(`server listening on port ${PORT}`));