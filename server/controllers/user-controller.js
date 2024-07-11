const { User } = require("../models");
const { signToken } = require("../utils/auth");

module.exports = {
  // get a single user by id or username
  async getSingleUser(req, res) {
    try {
      const { user = null, params } = req;
      const foundUser = await User.findOne({
        $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
      })
        .select("-__v")
        .populate("cardio")
        .populate("resistance");

      if (!foundUser) {
        return res.status(400).json({ message: 'Cannot find a user with this id!' });
      }

      res.json(foundUser);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error });
    }
  },

  // create a user, sign a token, and send it back to sign up page
  async createUser(req, res) {
    try {
      // Extract user data from the request body
      const userData = req.body;

      // Create a new user with the provided data
      const user = await User.create(userData);

      if (!user) {
        return res.status(400).json({ message: "Something went wrong while creating the user!" });
      }

      // Generate a token for the new user
      const token = signToken(user);

      // Respond with the token and the user data
      res.json({ token, user });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while creating the user', error });
    }
  },

  // login a user, sign a token, and send it back to login page
  async login(req, res) {
    try {
      // Extract login data from the request body
      const { username, email, password } = req.body;

      // Find the user by username or email
      const user = await User.findOne({
        $or: [{ username }, { email }],
      });

      if (!user) {
        return res.status(400).json({ message: "Can't find this user" });
      }

      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        return res.status(400).json({ message: "Wrong password!" });
      }

      // Generate a token for the logged-in user
      const token = signToken(user);

      // Respond with the token and the user data
      res.json({ token, user });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while logging in', error });
    }
  },
};
