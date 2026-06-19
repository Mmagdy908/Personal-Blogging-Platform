import userRepository from "../repositories/userRepository.js";

import JWT from "jsonwebtoken";

const authController = {
  register: async (req, res) => {
    try {
      // create new user
      const newUser = await userRepository.create(req.body);

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
      const { email, password } = req.body;

      // 1) get user
      const user = await userRepository.findByEmail(email);

      // 2) if user not found or password is incorrect
      if (!user || !(await user.checkPassword(password))) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // 3) generate token
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
