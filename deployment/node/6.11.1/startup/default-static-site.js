var express = require('express');
var path = require('path');

var app = express();

// Run the app by serving the static files in dist directory
app.use(express.static('/home/site/wwwroot'));

// For all GET requests, redirect to index.html
app.get('/*', function(req, res) {
    res.sendFile(path.join('/home/site/wwwroot/index.html'));
});

// Start app
app.listen(process.env.PORT || 8080);
