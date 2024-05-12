const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
      },
      message: (prop) => `invalid email : ${prop.value}`,
    },
  },
  password: {
    type: String,
    minLength: [8, "password is too short"],
    required: true,
  },
  roles: [
    {
      type: String,
      require: true,
      default: "student",
    },
  ],
  accountStatus: {
    type: String,
    enum: ['ACTIVE','PENDING','REJECT'],
    default: 'PENDING',
    required: true,
  },
});

const User = model("User", userSchema);
module.exports = User;
