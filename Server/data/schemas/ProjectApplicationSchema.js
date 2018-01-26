var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ProjectVariables = require("../../variables/ProjectVariables");
var validate = require("mongoose-validator");

var messageValidator = [
    validate({
        validator: 'isAscii',
        message: 'Message contains invalid characters!'
    }),
    validate({
        validator: 'isLength',
        arguments: [ProjectVariables.projectApplication.minLength, ProjectVariables.projectApplication.maxLength],
        message: 'Message length is invalid!'
    })
];

var statusValidator = [
    validate({
        validator: (val) => {
            return (Number.isInteger(val) && val >= 0 && val <= 2);
        },
        message: "Status is invalid"
    })
]

var projectApplicationSchema = new Schema({
    status: {
        required: true,
        type: Number,
        validate: statusValidator,
        default: 1
    },
    project: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Project"
    },
    author: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    message: {
        required: true,
        type: String,
        validate: messageValidator
    },
    createdAt: {
        type: Date
    }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

projectApplicationSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

projectApplicationSchema.pre("save", (next) => {
    //Set creation date
    if (!this.created_at) {
        this.created_at = new Date();
    }
    next();
});

module.exports = projectApplicationSchema;