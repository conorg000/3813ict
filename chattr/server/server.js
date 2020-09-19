var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const path = require('path');
const http = require('http').Server(app);
const cors = require('cors');
const io = require('socket.io')(http);
const sockets = require('./socket.js');
const server = require('./listen.js');
const PORT = 3000;
// Where to look for routes
app.use(express.static(path.join(__dirname, '../dist/chattr/')));
require('./routes/api-login.js')(app);

app.use(cors());

// To parse JSON data
app.use(bodyParser.json());

sockets.connect(io, PORT);

// Start server
server.listen(http, PORT);


// const whitelist = ['http://localhost:4200', 'http://localhost:3000'];

// const corsOptions = {
//    credentials: true, // This is important.
//    origin: (origin, callback) => {
//       if(whitelist.includes(origin))
//         return callback(null, true)

//         callback(new Error('Not allowed by CORS'));
//     }
//   }

//   app.use(function(req, res, next) {
//       res.header("Access-Control-Allow-Origin", 'http:localhost:4200'); 
//       res.header("Access-Control-Allow-Credentials", true);
//       res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//       res.header("Access-Control-Allow-Headers",
//     'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json,Authorization');
//       next();
//   });
//app.use(cors(corsOptions));
