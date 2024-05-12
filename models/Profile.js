const { Schema, model } = require("mongoose");

const profileSchema = new Schema({
  firstName: String,
  lastName: String,
  phone: String,
  avatar: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const Profile = model("Profile", profileSchema);

module.exports = Profile;
