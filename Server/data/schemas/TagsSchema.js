var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var validate = require("mongoose-validator");
var ProjectVariables = require("../../variables/ProjectVariables");

var titleValidator = [
    validate({
        validator: 'isAscii',
        message: 'Title contains invalid characters!'
    }),
    validate({
        validator: 'isLength',
        arguments: [ProjectVariables.tags.minLength, ProjectVariables.tags.maxLength],
        message: 'Tag length is invalid!'
    })
];

var tagsSchema = new Schema({
    title: {
        type: String,
        required: true,
        validate: titleValidator,
        index: {
            unique: true
        }
    },
}, {
    collection: "tags",
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

tagsSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

module.exports = tagsSchema;