var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ProjectVariables = require("../../variables/ProjectVariables");

var chatMessageSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    sent: {
        type: Date
    }
});

chatMessageSchema.method('toClient', function () {
    var obj = this.toObject();

    //Rename fields
    obj.id = obj._id;
    delete obj._id;

    return obj;
});


module.exports = chatMessageSchema;