var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const path = require('path');
const http = require('http').Server(app);
const cors = require('cors');
app.use(cors());
//require('./routes/accountroute.js')(app,path);

// To parse JSON data
app.use(bodyParser.json());

// Where to look for routes
app.use(express.static(path.join(__dirname, '../dist/chattr/')));

require('./routes/api-login.js')(app, path);

// Start server
app.listen(3000, '127.0.0.1', function(){
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    console.log('Server started at : ' + h + ' : ' + m);
});

