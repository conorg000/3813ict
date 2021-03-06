var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const path = require('path');
const http = require('http').Server(app);
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
const io = require('socket.io')(http);
const sockets = require('./socket.js');
const server = require('./listen.js');
const PORT = 3000;
app.use(bodyParser.json());

// CORS options
app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", '*'); 
     res.header("Access-Control-Allow-Credentials", true);
     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json,Authorization,text/plain,*/*, other_header');
     next();
});

////////////////////////////////////////////////////////////////////
/// Comment out corsOptions to undertake unit tests (test.js)    ///
/// Uncomment for production                                     ///
////////////////////////////////////////////////////////////////////
const whitelist = ['http://localhost:4200', 'http://localhost:3000'];
const corsOptions = {
    credentials: true, // This is important.
    origin: (origin, callback) => {
        if(whitelist.includes(origin))
            return callback(null, true)

        callback(new Error('Not allowed by CORS'));
    }
}
app.use(cors(corsOptions));
////////////////////////////////////////////////////////////////////

// Where to look for routes
app.use(express.static(path.join(__dirname, '../dist/chattr/')));

// Setup connection to MongoClient and sockets
// Detail all routes
const url = 'mongodb://localhost:27017';
MongoClient.connect(url, {poolSize:10, useNewUrlParser: true, useUnifiedTopology: true}, function(err, client){
    if (err) {return console.log(err)}
        const dbName = 'mydb';
        const db = client.db(dbName);
        require('./routes/api-login.js')(db,app,path);
        require('./routes/api-adduser.js')(db,app,path);
        require('./routes/api-getusers.js')(db,app,path);
        require('./routes/api-deleteuser.js')(db,app,path);
        require('./routes/api-updateuser.js')(db,app,path);
        require('./routes/api-addgroup.js')(db,app,path);
        require('./routes/api-getgroups.js')(db,app,path);
        require('./routes/api-addroom.js')(db,app,path);
        require('./routes/api-deletegroup.js')(db,app,path);
        require('./routes/api-deleteroom.js')(db,app,path);
        require('./routes/api-addusergroup.js')(db,app,path);
        require('./routes/api-adduserroom.js')(db,app,path);
        require('./routes/api-removeusergroup.js')(db,app,path);
        require('./routes/api-removeuserroom.js')(db,app,path);
        require('./routes/api-addgroupassis.js')(db,app,path);
        require('./routes/api-removegroupassis.js')(db,app,path);
        require('./routes/api-addmessage.js')(db,app,path);
        
        // Connect to sockets
        sockets.connect(io, PORT);
        
        server.listen(http, PORT);
});

module.exports = app;
