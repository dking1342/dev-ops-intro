import express from "express";
import { deleteUser, getAllUsers, getOneUser, loginUser, registerUser, updateUser } from "../controllers/usersController.js";

const UserRouter = express.Router();

UserRouter.get("/", async (_,res) => {
  await getAllUsers(res);
});
UserRouter.get("/:id", async (req,res) => {
  await getOneUser(req.params.id,res);
})
UserRouter.post("/register", async (req,res)=>{
  await registerUser(req.body,res);
});
UserRouter.post("/login", async (req,res) => {
  await loginUser(req.body,res);
});
UserRouter.put("/update/:id", async (req,res)=> {
  await updateUser(req.params.id,req.body,res);
});
UserRouter.delete("/delete/:id", async (req,res)=>{
  await deleteUser(req.params.id,res);
})

export default UserRouter;