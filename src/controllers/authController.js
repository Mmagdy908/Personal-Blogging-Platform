import userRepository from "../repositories/userRepository.js";

const authController = {
  register: async (req, res) => {
    try {
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
    // Handle login logic here
    res.status(200).json({ message: "Login successful" });
  },
};

export default authController;
