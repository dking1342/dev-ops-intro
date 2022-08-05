import Post from "../models/Post.js";

export const authorizeUser = async (req) => {
  const { username } = req.user;
  let response = {http:null,message:null};
  try {
    const post = await Post.findOne({_id:req.params.id});
    if(!post){
      reponse = {
        ...response,
        http:400,
        message:"invalid"
      }
    }
    if(post.username !== username){
      response = {
        ...response,
        http:401,
        message:"unauthorized"
      };
    } 
    return response;    
  } catch (error) {
    reponse = {
      ...response,
      http:400,
      message:"invalid"
    };
    return response;
  }
}