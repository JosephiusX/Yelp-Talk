const mongoose = require("mongoose");
const Schema = mongoose.Schema; // set to variable for ease of use
const validator = require("validator");
const bcrypt = require("bcrypt");


const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true, // only allows one of a kind
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.includes("password")) {
        throw new Error("password cannot contain password");
      }
    }
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

// mongoose middleware - automatically fires before user saves
UserSchema.pre("save", async function (next) {
  const user = this; // makes it easier to understand

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next(); // have to call next to finish middleware
});

const User = mongoose.model("User", UserSchema);

module.exports = User