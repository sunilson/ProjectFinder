var mongoose = require("mongoose");
var projectSchema = require("../schemas/ProjectSchema");

var Project = mongoose.model("Project", projectSchema);

module.exports = Project;