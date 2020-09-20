var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const path = require('path');
const http = require('http').Server(app);
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
// Object ID?
const io = require('socket.io')(http);
const sockets = require('./socket.js');
const server = require('./listen.js');
const PORT = 3000;
// To parse JSON data
app.use(bodyParser.json());


app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", 'http:localhost:4200'); 
     res.header("Access-Control-Allow-Credentials", true);
     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json,Authorization,text/plain,*/*');
     next();
});

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

// Where to look for routes
app.use(express.static(path.join(__dirname, '../dist/chattr/')));
require('./routes/api-login.js')(app);

// Connect to sockets
//sockets.connect(io, PORT);
//server.listen(http, PORT);

const url = 'mongodb://localhost:27017';
MongoClient.connect(url, {poolSize:10, useNewUrlParser: true, useUnifiedTopology: true}, function(err, client){
    if (err) {return console.log(err)}
        const dbName = 'mydb';
        const db = client.db(dbName);
        // require('./routes/api-add.js')(db,app,path);
        // require('./routes/api-getlist.js')(db,app,path);
        // require('./routes/api-getitem.js')(db,app,ObjectID);
        // require('./routes/api-update.js')(db,app,ObjectID);
        // require('./routes/api-deleteitem.js')(db,app,ObjectID);
        // require('./routes/api-prodcount.js')(db,app,path);
        // require('./routes/api-validid.js')(db,app,ObjectID);
        sockets.connect(io, PORT);
        
        server.listen(http, PORT);
});

//sockets.connect(io, PORT);

// Start servergit
//server.listen(http, PORT);


// const whitelist = ['http://localhost:4200', 'http://localhost:3000'];


//app.use(cors(corsOptions));
