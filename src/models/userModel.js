import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true, minlength: 8 },
  },
  { timestamps: true },
);

userSchema.pre("validate", function () {
  console.log("Pre-validate hook triggered for user:", this);
  if (!this.id) {
    this.id = this._id.toString();
  }
});

const User = model("User", userSchema);
export default User;
