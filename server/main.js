const express = require("express");
const cors = require("cors");
const {getAll, createOne, getOne, updateOne, deleteOne} = require("./controllers/users");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json())

// routes
app.get("/", async (_,res) => {
  const { users, error } = await getAll();
  res.json({"data":users,"error":error});
});
app.get("/users/:id",async (req,res)=>{
  let {user, error } = await getOne(req.params.id);
  return res.json({"data":user,"error":error});
})
app.post("/user/create",async (req,res) => {
  const { user, error } = await createOne(req.body);
  res.json({"data":user,"error":error});
});
app.put("/user/update/:id",async (req,res) => {
  const { user, error } = await updateOne(req.params.id, req.body);
  res.json({"data":[user.value],"error":error});
});
app.delete("/user/delete/:id",async (req,res)=>{
  const { user, error } = await deleteOne(req.params.id);
  return res.json({"data":user.value,"error":error});
})


app.listen(PORT,()=> console.log("server listening..."))