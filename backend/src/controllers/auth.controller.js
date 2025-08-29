import bcrypt from 'bcrypt'
import User from '../models/user.model.js';
import { generateToken } from '../lib/utils.js';

export const singup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "password must be at least 6 characters" });
    }

    const user = await User.findOne({ where: { email } });
    if (user) return res.status(400).json({ message: "email alredy exists " });

    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username: username,
      email: email,
      password: hashed_password,
    });

    if (newUser) {
      generateToken(newUser.id, res);

      res.status(201).json({ id: newUser.id, email: newUser.email, username: newUser.username });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  }
  catch (e) {
    console.log("Error in singup controller", e.message);
    res.status(500).json({ message: "Internal server error", error: e.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ message: "Invalid credential" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(404).json({ message: "Invalid credential" });

    generateToken(user.id);

    res.status(200).json({
      _id: user.id,
      email: user.email,
      username: user.username
    });
  } catch (e) {
    console.log("Error in login controller", e.message);
    res.status(500).json({ message: "Internal server error", error: e.message });
  }
}

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (e) {
    console.log("Error in checkAuth controller", e.message);
    res.status(500).json({ message: "Internal server error", error: e.message });
  }
}

export const logout = (req, res) => {
  try {
    req.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logout successfully" });
  } catch (e) {
    console.log("Error in logout controller", e.message);
    res.status(500).json({ message: "Internal server error", error: e.message });
  }
}

export const updateProfile = async (req, res) => {
  //TODO: update profile
}
