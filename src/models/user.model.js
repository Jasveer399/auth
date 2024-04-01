import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a Username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please enter a Email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a Passwodr"],
  },
  isverified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgetpaswordToken: String,
  forgetpaswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;