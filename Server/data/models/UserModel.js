var mongoose = require("mongoose");
var userSchema = require("../schemas/UserSchema");

var User = mongoose.model("User", userSchema);

module.exports = User;
