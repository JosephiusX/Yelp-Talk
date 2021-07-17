const mongoose = require("mongoose");
const Schema = mongoose.Schema; // set to variable for ease of use
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')



const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true, // only allows one of a kind allowed in database
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

userSchema.methods.toJSON = function () { // reg func for use of 'this' keyword
  const user = this
  const userObject = user.toObject()
  
  delete userObject.password
  delete userObject.tokens
  
  return userObject
}

userSchema.methods.generateAuthToken = async function () { // reg function for this keyword
  const user = this
  const token = jwt.sign({_id: user._id.toString() },'thisismynewcourse')

  user.tokens = user.tokens.concat({token}) // the token property gets its value from token variable, shorthand ({ token })
  await user.save()

  return token
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email : email }) // find one user with an email that matches our email argument ({ email }) for short and set it a value of user

  if(!user) { // if user is false send error
    throw new Error('Unable to login')
  } // otherwise

  const isMatch = await bcrypt.compare(password, user.password) // compare password with userpassword and set the value for isMatch boolean

  if (!isMatch) { // if false
    throw new Error('Unable to login') // for security message shouldnt be detailed
  } // otherwise

  return user // user email

}

// hash plain text password
// mongoose middleware - automatically fires before user saves
userSchema.pre("save", async function (next) {
   const user = this; // makes it easier to understand
    if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next(); // have to call next to finish middleware
});

const User = mongoose.model("User", userSchema);

module.exports = User

