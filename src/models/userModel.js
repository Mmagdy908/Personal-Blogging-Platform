import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: [true, "Email already exists"],
    },
    password: { type: String, required: true, trim: true, minlength: 8 },
  },
  { timestamps: true },
);

userSchema.pre("validate", function () {
  if (!this.id) {
    this.id = this._id.toString();
  }
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = process.env.SALT || 12;
  this.password = await bcrypt.hash(this.password, parseInt(salt));
});

userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);
export default User;
