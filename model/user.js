const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requiredString = { type: String, required: true };

const emailValidation = {
  ...requiredString,
  validate: {
    validator: function (v) {
      return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
    },
    message: (props) => `${props.value} is not a valid Email!`,
  },
};

const passwordValidation = {
  ...requiredString,
  validate: {
    validator: function (v) {
      return /\d{3}-\d{3}-\d{4}/.test(v);
    },
    message: (props) => `${props.value} is not a valid password!`,
  },
};

const UserSchema = new Schema({
  name: requiredString,
  email: emailValidation,
  password: String
});

const User = mongoose.model("crazy_user", UserSchema);
module.exports = User;
