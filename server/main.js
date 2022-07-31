const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json())

let users = [
  {
    "id":1,
    name:"jack",
    email:"jack@example.com",
    interests:["coding", "walking"]
  }
]

app.get("/", (_,res) => {
  return res.json({"data":users});
});

app.get("/users/:id",(req,res)=>{
  const id = Number(req.params.id);
  let user = users.filter(user=> user.id === id);
  return res.json({"data":user});
})

app.post("/user/create",(req,res) => {
  let user = req.body;
  user.id = Math.ceil(Math.random() * 10000000);
  users.push(user);

  res.json({"data":user});
});
app.put("/user/update/:id",(req,res) => {
  const id = Number(req.params.id);
  console.log("id",id);
  users = users
    .map(user => {
      if(user.id === id){
        user = {
          id,
          name:req.body.name,
          email:req.body.email,
          interests:req.body.interests
        }
      }
      return user;
    })
  let user = users.filter(user => user.id === id)
  res.json({"data":user});
});
app.delete("/user/delete/:id",(req,res)=>{
  const id = Number(req.params.id);
  users = users.filter(user => user.id !== id);
  return res.json({"data":"user deleted"});
})


app.listen(PORT,()=> console.log("server listening..."))