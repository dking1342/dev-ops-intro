const express = require("express");
const cors = require("cors");
const {getAll, createOne, getOne, updateOne, deleteOne} = require("./controllers/users");

const app = express();
const PORT = 5001;


app.use(cors());
app.use(express.json())

// routes
app.get("/", async (_,res) => {
  getAll(res);
});
app.get("/users/:id",async (req,res)=>{
  getOne(req.params.id,res);
})
app.post("/user/create",async (req,res) => {
  createOne(req.body,res);
});
app.put("/user/update/:id",async (req,res) => {
  updateOne(req.params.id,req.body,res);
});
app.delete("/user/delete/:id",async (req,res)=>{
  deleteOne(req.params.id,res);
})


app.listen(PORT,()=> console.log("server listening..."))