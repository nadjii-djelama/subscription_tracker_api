import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "UserName is required."],
      minLength: 2,
      maxLength: 20,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      minLength: 10,
      maxLength: 50,
      lowerCase: true,
      match: [/\S+@\S+\.\S/, "please try to enser a valid email."],
    },
    password: {
      type: String,
      Number,
      Symbol,
      required: [true, "password is required."],
      minLength: 5,
      mawLength: 30,
      select: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
