import { schema, model } from "mongoose";

const userSchema = new schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true, minlength: 8 },
  },
  { timestamps: true },
);
const User = model("User", userSchema);
User.pre("save", function (next) {
  if (!this.id) {
    this.id = this._id.toString();
  }
  next();
});
export default User;
