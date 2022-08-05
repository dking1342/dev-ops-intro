import Post from "../models/Post.js";

// route    GET /posts
// des      Retrieves all posts from db
// access   Public
export const getAllPosts = async (res) => {
  try {
    const posts = await Post.find();
    res
      .status(200)
      .json({ success: true, count: posts.length, payload: posts });
  } catch (error) {
    res.status(400).json({ success: false, payload: error.message });
  }
};

// route    GET /posts/:id
// des      Retrieves single post from db
// access   Public
export const getOnePost = async (id, res) => {
  try {
    const post = await Post.findById(id);
    res.status(200).json({ success: true, payload: post });
  } catch (error) {
    res.status(400).json({ success: false, payload: error.message });
  }
};

// route    POST /posts/create
// des      Saves post to db
// access   Public
export const savePost = async (post, res) => {
  try {
    const savedPost = await Post.create(post);
    res.status(201).json({ success: true, payload: savedPost });
  } catch (error) {
    res.status(400).json({ success: false, payload: error.message });
  }
};

// route    PUT /posts/update/:id
// des      Updates post in db
// access   Public
export const updatePost = async (id, post, res) => {
  try {
    const updatedPost = await Post.findOneAndUpdate({ _id: id }, post, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    if (updatedPost) {
      res.status(201).json({ success: true, payload: updatedPost });
    } else {
      res.status(400).json({ success: false, payload: "invalid attempt" });
    }
  } catch (error) {
    res.status(400).json({ success: false, payload: error.message });
  }
};

// route    DELETE /posts/delete/:id
// des      Deletes a post from the db
// access   Public
export const deletePost = async (id, res) => {
  try {
    const deletedPost = await Post.deleteOne({ _id: id });
    res.status(200).json({ success: true, payload: deletedPost });
  } catch (error) {
    res.status(400).json({ success: false, payload: error.message });
  }
};
