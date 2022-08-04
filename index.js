import 'dotenv/config'
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (_,res)=>{
  res.json({"message":"hello world","error":null})
});


app.listen(PORT,()=>console.log(`server listening on port ${PORT}`));