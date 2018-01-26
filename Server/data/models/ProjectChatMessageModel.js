var mongoose = require("mongoose");
var chatMessageSchema = require("../schemas/ProjectChatSchema");

var ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);

module.exports = ChatMessage;