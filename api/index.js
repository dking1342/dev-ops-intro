import express from "express";
import cors from "cors";

const PORT = 5001;
const app = express();
app.use(cors());

app.get("/", (req,res)=>{
  res.json({success:true, payload:"home"});
});
app.get("/dashboard",(req,res)=>{
  res.json({success:true, payload:"dashboard"});
});

app.listen(PORT,()=>console.log("server listening..."));