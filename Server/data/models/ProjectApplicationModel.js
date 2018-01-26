var mongoose = require("mongoose");
var projectApplicationSchema = require("../schemas/ProjectApplicationSchema");

var ProjectApplication = mongoose.model("Application", projectApplicationSchema);

module.exports = ProjectApplication;