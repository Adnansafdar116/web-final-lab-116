var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: [true, "User must have an email address"],
    validate: {
      validator: function (mail) {
        return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(mail);


      },
      message: "Invalid email address",
    },
    unique: [true, "User exist with the same email already"],
  },
  password: String,
});
const User = mongoose.model("User", UserSchema);






module.exports = User;
