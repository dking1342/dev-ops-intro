import User from "../models/User.js";

// route    GET /users
// des      Retrieves all users from db
// access   Public
export const getAllUsers = async (res) => {
  try {
    const users = await User.find({});
    res
      .status(200)
      .json({ success: true, count: users.length, payload: users });
  } catch (error) {
    res.status(400).json({ success: false, payload: error.message });
  }
};

// route    GET /users/:id
// des      Retrieves single users from db
// access   Public
export const getOneUser = async (id, res) => {
  try {
    const user = await User.findById(id);
    res.status(200).json({ success: true, payload: user });
  } catch (error) {
    res.status(400).json({ success: false, payload: error.message });
  }
};

// route    POST /users/register
// des      Saves user to db
// access   Public
export const registerUser = async (user, res) => {
  try {
    const savedUser = await User.create(user);
    res.status(201).json({ success: true, payload: savedUser });
  } catch (error) {
    res.status(400).json({ success: false, payload: error.message });
  }
};

// route    PUT /users/update/:id
// des      Updates user in db
// access   Public
export const updateUser = async (id, user, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate({ _id: id }, user, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    if (updatedUser) {
      res.status(201).json({ success: true, payload: updatedUser });
    } else {
      res.status(400).json({ success: false, payload: "invalid attempt" });
    }
  } catch (error) {
    res.status(400).json({ success: false, payload: error.message });
  }
};

// route    DELETE /users/delete/:id
// des      Deletes a user from the db
// access   Public
export const deleteUser = async (id, res) => {
  try {
    const deletedUser = await User.deleteOne({ _id: id });
    res.status(201).json({ success: true, payload: deletedUser });
  } catch (error) {
    res.status(400).json({ success: false, payload: error.message });
  }
};

// route    POST /users/login
// des      Logs in the user
// access   Public
export const loginUser = async (user, res) => {
  try {
    const { username, password } = user;
    // check username
    User.findOne({ username: username }, function (err, result) {
      if (err) throw err;
      if (result) {
        // check password
        const isPasswordValid = result.password === password;

        if (isPasswordValid) {
          // set cookie

          // login user
          res.status(200).json({ success: true, payload: "logged in user" });
        } else {
          res.status(400).json({ success: false, payload: "invalid password" });
        }
      } else {
        res.status(400).json({ success: false, payload: "invalid username" });
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, payload: error.message });
  }
};
