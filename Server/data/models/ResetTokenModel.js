var mongoose = require("mongoose");
var ResetTokenSchema = require("../schemas/ResetTokenSchema");

var resetToken = mongoose.model("ResetToken", ResetTokenSchema);

module.exports = resetToken;