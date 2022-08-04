import express from "express";
import { deleteUser, getAllUsers, getOneUser, saveUser, updateUser } from "../controllers/usersController.js";



const UserRouter = express.Router();

UserRouter.get("/", async (_,res) => {
  await getAllUsers(res);
});
UserRouter.get("/user/:id", async (req,res) => {
  console.log("id",req.params.id);
  await getOneUser(req.params.id,res);
})
UserRouter.post("/user/create", async (req,res)=>{
  await saveUser(req.body,res);
});
UserRouter.put("/user/update/:id", async (req,res)=> {
  await updateUser(req.params.id,req.body,res);
});
UserRouter.delete("/user/delete/:id", async (req,res)=>{
  await deleteUser(req.params.id,res);
})

export default UserRouter;