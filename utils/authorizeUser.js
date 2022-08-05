import Post from "../models/Post.js";

export const authorize = async (req,res,next) => {
  const { username } = req.user;
  try {
    const post = await Post.findOne({_id:req.params.id});
    if(!post){
      return res.status(400).json({success:false,payload:"invalid"});
    }
    if(post.username !== username){
      return res.status(401).json({success:false,payload:"unauthorized"});
    } 
    next();
  } catch (error) {
    return res.status(400).json({success:false,payload:error.message});
  }
}