import 'dotenv/config'
import express from "express";
import cors from "cors";
import { mongoStartup } from './config/mongodb.js';
import UserRouter from './routes/usersRoutes.js';

// variables
const PORT = process.env.PORT || 3000;

// express init and middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

// init db
mongoStartup()

// routes
app.use("/",UserRouter);

// server init
app.listen(PORT,()=>console.log(`server listening on port ${PORT}`));