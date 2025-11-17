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
      lowercase: true, // ❌ FIXED: Was "lowerCase" - should be "lowercase"
      match: [/\S+@\S+\.\S+/, "please try to enter a valid email."], // ❌ FIXED: Regex was incomplete (\S. needs +), typo "enser" → "enter"
    },
    password: {
      type: String, // ❌ FIXED: Removed "Number, Symbol," - invalid syntax
      required: [true, "password is required."],
      minLength: 5,
      maxLength: 30, // ❌ FIXED: Was "mawLength" - typo
      select: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
