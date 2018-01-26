const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passwordHash = require("password-hash");
const UserVariables = require("../../variables/UserVariables");
const validate = require("mongoose-validator");
const validatorModule = require('validator');

const usernameValidator = [
    validate({
        validator: 'matches',
        arguments: ['^[a-zA-Z0-9_.-]*$', ''],
        message: 'Username contains invalid characters!'
    }),
    validate({
        validator: 'isLength',
        arguments: [UserVariables.userName.minLength, UserVariables.userName.maxLength],
        message: "Username is too long or too short!"
    })
];

const nameValidator = [
    validate({
        validator: (val) => {
            return validatorModule.isAlpha(val, "de-DE");
        },
        message: 'Name contains invalid characters!'
    }),
    validate({
        validator: 'isLength',
        arguments: [UserVariables.name.minLength, UserVariables.name.maxLength],
        message: "Name is too long or too short!"
    })
];

const passwordValidator = [
    validate({
        validator: 'isLength',
        arguments: [UserVariables.password.minLength, UserVariables.password.maxLength],
        passIfEmpty: true,
        message: "Password is too long or too short!"
    })
];

const emailValidator = [
    validate({
        validator: 'isEmail',
        message: 'Email is not valid!'
    })
];

var userSchema = new Schema({
    username: {
        type: String,
        required: true,
        validate: usernameValidator,
        index: {
            unique: true
        }
    },
    email: {
        type: String,
        required: true,
        validate: emailValidator,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        validate: passwordValidator
    },
    activated: {
        type: Boolean
    },
    firstname: {
        type: String,
        required: true,
        validate: nameValidator
    },
    lastname: {
        type: String,
        required: true,
        validate: nameValidator
    },
    profilepicture: {
        type: String
    },
    type: {
        type: String,
        required: true
    },
    tags: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Tag'
    }],
    applications: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Application'
    }],
    memberProjects: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Project'
    }],
    ownProjects: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Project'
    }],
    created_at: Date
}, {
    collection: "users",
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.pre('save', function (next) {
    //Set creation date
    if (!this.created_at) {
        this.created_at = new Date();
    }

    //Set activation status
    if (!this.activated) {
        if (this.type !== UserVariables.type.standard) {
            this.activated = true;
        } else {
            this.activated = false;
        }
    }

    //Transform username
    this.username = this.username.toLowerCase();

    //If proifle picture is empty, load default picture
    if (!this.profilepicture) {
        this.profilepicture = "http://www.planystech.com/wp-content/uploads/2017/03/profile-placeholder.jpg";
    }

    if (!this.isModified('password')) return next();

    //Hash password
    if (this.password) {
        this.password = passwordHash.generate(this.password);
    }


    next();
});

userSchema.method.comparePassword = function (candidatePassword) {
    return passwordHash.verify(this.password, candidatePassword);
}

module.exports = userSchema;