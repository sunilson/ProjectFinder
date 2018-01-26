var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var notificationTokenSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        required: true
    },
    notificationToken: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    }
}, {
    collection: "notificationTokens"
});

module.exports = notificationTokenSchema;