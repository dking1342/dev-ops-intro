import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title:{
    type: String,
    require:[true, "Post must have a title"],
  },
  body:{
    type: String,
    require:[true,"Post must have a body"]
  },
},{
  timestamps:true
})

const Post = mongoose.model('Post',PostSchema);

export default Post;