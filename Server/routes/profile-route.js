const express = require('express');
const router = express.Router();
const ObjectOperations = require("../utils/objectOperations");
const multer = require('multer');
const UserModel = require("../data/models/UserModel");
const upload = multer({
    dest: 'uploads/'
});
const fs = require('fs');
const cfg = require("../config.js");
const cloudinary = require('cloudinary');
cloudinary.config(cfg.cloudinaryOptions);

router.patch('/', (req, res, next) => {
    if (!req.body.user || !req.body.user.firstname || !req.body.user.lastname || !req.body.user.tags || req.body.user.tags.length == 0) {
        return res.sendStatus(400);
    }

    const id = req.user._id;
    const user = req.body.user;

    UserModel.update({
        _id: id
    }, {
        firstname: user.firstname,
        lastname: user.lastname,
        tags: user.tags
    }).then(result => {
        res.sendStatus(201);
    }).catch(error => {
        next(error);
    });
});

router.post('/image', upload.single('file'), (req, res, next) => {
    //TODO Nur Admin erlauben
    if (!req.file) return res.sendStatus(400);
    cloudinary.uploader.upload(req.file.path, (result) => {
        UserModel.update({
            _id: req.user._id
        }, {
            profilepicture: result.secure_url
        }).then(() => {
            fs.unlink(req.file.path);
            res.status(200).json({
                url: result.secure_url
            });
        }).catch((e) => {
            next(e);
        });
    }, {
        crop: "lfill",
        width: 150,
        height: 150
    });
});

module.exports = router;