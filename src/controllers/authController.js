import JWT from "jsonwebtoken";

import userRepository from "../repositories/userRepository.js";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../schemas/authSchema.js";

const authController = {
  register: async (req, res) => {
    try {
      // 1) validate input
      const userData = validateRegisterInput(req.body);

      // 2) create new user
      const newUser = await userRepository.create(userData);

      res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error registering user", error: error.message });
    }
  },
  login: async (req, res) => {
    try {
      // 1) validate input
      const { email, password } = validateLoginInput(req.body);

      // 2) get user
      const user = await userRepository.findByEmail(email);

      // 3) if user not found or password is incorrect
      if (!user || !(await user.checkPassword(password))) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // 4) generate token
      const token = JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRES_IN || "7d",
      });

      res.status(200).json({ message: "Login successful", user, token });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error logging in", error: error.message });
    }
  },
};

export default authController;
