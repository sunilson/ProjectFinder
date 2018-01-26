const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GeoJSON = require('mongoose-geojson-schema');
const ProjectVariables = require("../../variables/ProjectVariables");
const validate = require("mongoose-validator");
const validateCoordinates = require("is-coordinates");
const validatorModule = require('validator');

const titleValidator = [
    validate({
        validator: (val) => {
            return val.match(/^[0-9a-zA-ZäöüÄÖÜ]/);
        },
        message: 'Title contains invalid characters!'
    }),
    validate({
        validator: 'isLength',
        arguments: [ProjectVariables.projectTitle.minLength, ProjectVariables.projectTitle.maxLength],
        message: 'Title length is invalid!'
    })
];

const descriptionValidator = [
    validate({
        validator: (val) => {
            return val.match(/^[0-9a-zA-ZäöüÄÖÜ]/);
        },
        message: 'Description contains invalid characters!'
    }),
    validate({
        validator: 'isLength',
        arguments: [ProjectVariables.projectDescription.minLength, ProjectVariables.projectDescription.maxLength],
        message: 'Description length is invalid!'
    })
];

const locationNameValidator = [
    validate({
        validator: 'isLength',
        arguments: [ProjectVariables.locationName.minLength, ProjectVariables.locationName.maxLength],
        message: 'Location name length is invalid!'
    })
];

const locationValidator = [
    validate({
        validator: (val) => {
            return validateCoordinates(val);
        },
        passIfEmpty: true,
        message: 'Location is invalid!'
    })
];

const statusValidator = [
    validate({
        validator: (val) => {
            return (Number.isInteger(val) && val >= 0 && val <= 2);
        },
        message: "Status is invalid"
    })
]

const maxMemberAmountValidator = [
    validate({
        validator: (val) => {
            return val >= ProjectVariables.maxMemberAmount.min && val <= ProjectVariables.maxMemberAmount.max;
        },
        message: 'Max member amount must be a number and in the valid range!'
    }),
];

const tagValidator = [
    validate({
        validator: (val) => {
            return val.length > 0
        },
        message: "Tags array can't be empty"
    })
];

function isInt(value) {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10));
}

var projectSchema = new Schema({
    title: {
        type: String,
        required: true,
        validate: titleValidator
    },
    description: {
        type: String,
        required: true,
        validate: descriptionValidator
    },
    createdAt: {
        type: Date,
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    memberAmount: {
        type: Number,
        default: 1
    },
    maxMemberAmount: {
        type: Number,
        required: true,
        defaults: ProjectVariables.maxMemberAmount.default,
        validate: maxMemberAmountValidator
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    status: {
        required: true,
        type: Number,
        validate: statusValidator,
        default: 0
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    applications: [{
        type: Schema.Types.ObjectId,
        ref: 'Application'
    }],
    location: {
        coordinates: {
            type: [Number],
            index: '2dsphere',
            validate: locationValidator
        },
        name: {
            type: String,
            validate: locationNameValidator
        }
    },
    payment: {
        paid: {
            type: Boolean,
            required: true
        },
        amount: Number
    },
    tags: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Tag'
    }]
}, {
    collection: "projects",
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

projectSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

projectSchema.pre("save", (next) => {
    //Set creation date
    if (!this.createdAt) {
        this.createdAt = new Date();
    }

    next();
});

module.exports = projectSchema;