"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
app.get('/', function (req, res) {
    res.send('Updated 12:42');
});
app.listen(port, function () {
    // if (err) {
    //   return console.error(err);
    // }
    return console.log("server is listening on " + port);
});
