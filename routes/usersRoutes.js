import express from "express";
import { deleteUser, getAllUsers, getOneUser, loginUser, registerUser, updateUser } from "../controllers/usersController.js";



const UserRouter = express.Router();

UserRouter.get("/users", async (_,res) => {
  await getAllUsers(res);
});
UserRouter.get("/users/:id", async (req,res) => {
  await getOneUser(req.params.id,res);
})
UserRouter.post("/users/register", async (req,res)=>{
  await registerUser(req.body,res);
});
UserRouter.post("/users/login", async (req,res) => {
  await loginUser(req.body,res);
});
UserRouter.put("/users/update/:id", async (req,res)=> {
  await updateUser(req.params.id,req.body,res);
});
UserRouter.delete("/users/delete/:id", async (req,res)=>{
  await deleteUser(req.params.id,res);
})

export default UserRouter;