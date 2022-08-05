import express from "express";
import { deletePost, getAllPosts, getOnePost, savePost, updatePost } from "../controllers/postController.js";
import { protect } from "../utils/sessionAuth.js";

const PostRouter = express.Router();

PostRouter.get("/", getAllPosts);
PostRouter.get("/:id", getOnePost);
PostRouter.post("/create", protect, savePost);
PostRouter.put("/update/:id", protect, updatePost);
PostRouter.delete("/delete/:id", protect, deletePost);

export default PostRouter;