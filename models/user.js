const { Schema, model } = require("mongoose");

const  { handleSaveError, handleUpdateValidate } = require("./hooks");

const emailRegexp = require("../constants/user-constants");

const userSchema = new Schema({
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: emailRegexp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    avatarURL: {
      type: String,
      // default: "not found",
      // required: true,
  },
    token: {
      type: String,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    // required: [true, 'Verify token is required'],
  },
  }, {versionKey: false, timestamps: true});

userSchema.pre("findOneAndUpdate", handleUpdateValidate);

userSchema.post("save", handleSaveError);

userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

module.exports = User;