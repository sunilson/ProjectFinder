var searchTools = module.exports = {};
var stopword = require("stopword");

searchTools.removeStopWords = (string) => {
    return stopword.removeStopwords(string.split(' ')).join(' ');
}