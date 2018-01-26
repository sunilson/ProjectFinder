var mongoose = require("mongoose");
var tagsSchema = require("../schemas/TagsSchema");

var Tag = mongoose.model("Tag", tagsSchema);

module.exports = Tag;