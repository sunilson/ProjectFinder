var mongoose = require("mongoose");
var chatSchema = require("../schemas/ProjectChatSchema");

var Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;