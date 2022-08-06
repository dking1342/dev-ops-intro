import express from "express";
import { deletePost, getAllPosts, getOnePost, savePost, updatePost } from "../controllers/postController.js";
import { authorize } from "../utils/authorizeUser.js";
import { protect } from "../utils/sessionAuth.js";

const PostRouter = express.Router();

PostRouter.get("/", getAllPosts);
PostRouter.get("/test",(_,res)=>{ res.json({"success":true,"payload":"hello"})})
PostRouter.get("/:id", protect, getOnePost);
PostRouter.post("/create", protect, savePost);
PostRouter.put("/update/:id", protect, authorize, updatePost);
PostRouter.delete("/delete/:id", protect, authorize, deletePost);

export default PostRouter;
