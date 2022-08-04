import User from "../models/User.js";


// route    GET /
// des      Retrieves all users from db
// access   Public
export const getAllUsers = async (res) => {
  try {
    const users = await User.find({});
    res.status(200).json({success:true, count:users.length, payload:users});
  } catch (error) {
    res.status(400).json({success:false,payload:error.message});
  }
}

// route    GET /user/:id
// des      Retrieves single users from db
// access   Public
export const getOneUser = async (id, res) => {
  try {
    const user = await User.findById(id);
    res.status(200).json({success:true, payload: user });
  } catch (error) {
    res.status(400).json({success:false,payload:error.message});
  }
}

// route    POST /user/create
// des      Saves user to db
// access   Public
export const saveUser = async (user,res) => {
  try {
    const savedUser = await User.create(user);
    res.status(201).json({success:true, payload:savedUser});
  } catch (error) {
    res.status(400).json({success:false, payload: error.message })
  }
}

// route    PUT /user/update/:id
// des      Updates user in db
// access   Public
export const updateUser = async (id,user,res) => {
  try {
    const updatedUser = await User.findOneAndUpdate({_id:id},user,{new:true,useFindAndModify:false});
    res.status(201).json({success:true, payload:updatedUser});
  } catch (error) {
    res.status(400).json({success:false, payload: error.message })
  }
}

// route    DELETE /user/delete/:id
// des      Deletes a user from the db
// access   Public
export const deleteUser = async (id,res) => {
  try {
    const deletedUser = await User.deleteOne({_id:id});
    res.status(201).json({success:true, payload:deletedUser});
  } catch (error) {
    res.status(400).json({success:false, payload: error.message })
  }
}

