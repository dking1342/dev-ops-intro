import express from "express";
import { deleteUser, getAllUsers, getOneUser, loginUser, logoutUser, registerUser, updateUser } from "../controllers/usersController.js";

const UserRouter = express.Router();

UserRouter.get("/", getAllUsers);
UserRouter.get("/logout", logoutUser);
UserRouter.get("/:id", getOneUser);
UserRouter.post("/register", registerUser);
UserRouter.post("/login", loginUser);
UserRouter.put("/update/:id", updateUser);
UserRouter.delete("/delete/:id", deleteUser);

export default UserRouter;