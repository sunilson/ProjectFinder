var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var resetTokenSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        required: true
    },
    resetToken: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    expires: {
        type: Date,
        required: true
    }
}, {
    collection: "resetTokens"
});

module.exports = resetTokenSchema;