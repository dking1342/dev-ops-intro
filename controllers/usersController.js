import User from "../models/User.js";

// route    GET /users
// des      Retrieves all users from db
// access   Public
export const getAllUsers = async (_, res) => {
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
export const getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ success: true, payload: user });
  } catch (error) {
    res.status(400).json({ success: false, payload: error.message });
  }
};

// route    POST /users/register
// des      Saves user to db
// access   Public
export const registerUser = async (req, res) => {
  try {
    const savedUser = await User.create(req.body);

    // set cookie
    req.session.user = savedUser;
    res.status(201).json({ success: true, payload: savedUser });
  } catch (error) {
    res.status(400).json({ success: false, payload: error.message });
  }
};

// route    PUT /users/update/:id
// des      Updates user in db
// access   Public
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
        useFindAndModify: false,
        runValidators: true,
      }
    );
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
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.deleteOne({ _id: req.params.id });
    res.status(201).json({ success: true, payload: deletedUser });
  } catch (error) {
    res.status(400).json({ success: false, payload: error.message });
  }
};

// route    POST /users/login
// des      Logs in the user
// access   Public
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    // check username
    User.findOne({ username: username }, function (err, result) {
      if (err || !result) {
        res.status(400).json({ success: false, payload: "invalid user" });
      } else {
        const isPasswordValid = result.password === password;
        if (isPasswordValid) {
          // set cookie
          req.session.user = result;
          console.log("login",req.session);
          
          // login user
          res.status(200).json({ success: true, payload: "logged in user" });
        } else {
          res.status(400).json({ success: false, payload: "invalid password" });
        }
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, payload: error.message });
  }
};

