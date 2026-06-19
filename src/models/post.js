import { schema, model } from "mongoose";
import { ObjectId } from "mongodb";

const postSchema = new schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    author: { type: String, ref: "User", required: true },
  },
  { timestamps: true },
);
const Post = model("Post", postSchema);
Post.pre("save", function (next) {
  if (!this.id) {
    this.id = this._id.toString();
  }
  next();
});
export default Post;
