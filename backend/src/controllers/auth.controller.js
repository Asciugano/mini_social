import bcrypt from 'bcrypt'
import User from '../models/user.model';
import { generateToken } from '../lib/utils';

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
