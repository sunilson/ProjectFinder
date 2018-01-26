var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ProjectVariables = require("../../variables/ProjectVariables");
var chatMessages = require("./ChatMessageSchema");

var projectChatSchema = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Project"
    },
    messages: [chatMessages],
    lastMessage: {
        type: Date
    }
});

projectChatSchema.method('toClient', function () {
    var obj = this.toObject();

    //Rename fields
    obj.id = obj._id;
    delete obj._id;

    return obj;
});


module.exports = projectChatSchema;