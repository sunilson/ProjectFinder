var mongoose = require("mongoose");
var NotificationTokenSchema = require("../schemas/NotificationTokenSchema");

var notificationToken = mongoose.model("NotificationToken", NotificationTokenSchema);

module.exports = notificationToken;