import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    author: { type: String, ref: "User", required: true },
  },
  { timestamps: true },
);
postSchema.pre("save", function (next) {
  if (!this.id) {
    this.id = this._id.toString();
  }
  next();
});
const Post = model("Post", postSchema);
export default Post;
