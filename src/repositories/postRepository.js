import Post from "../models/postModel.js";

const postRepository = {
  create: async (postData) => {
    const post = new Post(postData);
    return await post.save();
  },
  getAll: async () => {
    return await Post.find().populate("author", "name email");
  },
  update: async (id, postData) => {
    return await Post.findByIdAndUpdate(id, postData, { new: true });
  },
  delete: async (id) => {
    return await Post.findByIdAndDelete(id);
  },
};
export default postRepository;
