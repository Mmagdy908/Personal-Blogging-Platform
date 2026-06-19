import User from "../models/userModel.js";

const userRepository = {
  create: async (userData) => {
    const user = new User(userData);
    // save to trigger the pre-save hook and generate the id
    return await user.save();
  },
  findById: async (id) => {
    return await User.findById(id);
  },
  findByEmail: async (email) => {
    return await User.findOne({ email });
  },
};

export default userRepository;
