import express from "express";
import { deletePost, getAllPosts, getOnePost, savePost, updatePost } from "../controllers/postController.js";

const PostRouter = express.Router();

PostRouter.get("/", async (_,res) => {
  await getAllPosts(res);
});
PostRouter.get("/:id", async (req,res) => {
  await getOnePost(req.params.id,res);
});
PostRouter.post("/create", async (req,res)=>{
  await savePost(req.body,res);
});
PostRouter.put("/update/:id", async (req,res)=> {
  await updatePost(req.params.id,req.body,res);
});
PostRouter.delete("/delete/:id", async (req,res)=>{
  await deletePost(req.params.id,res);
});

export default PostRouter;