var express = require('express');
var path = require('path');

var app = express();

// Run the app by serving the static files in dist directory
app.use(express.static(__dirname));

// For all GET requests, redirect to index.html
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// Start app
app.listen(process.env.PORT || 8080);
