const { resolveSoa } = require("dns");
const fs = require("fs");
const path = require('path');

module.exports = function(db,app){
    // Route to check user credentials
    app.post('/api/auth', function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        username = req.body.username;
        console.log(username);
        pwd = req.body.pwd;
        console.log(pwd);
        const collection = db.collection('users');
        var user = {};
        user.email = '';
        user.username = '';
        user.id = null;
        user.role = '';
        collection.find({'username':username, 'pwd':pwd}).count((err,count)=>{
            if (count==0){
                console.log('bu keyi');
                user.valid = false;
                res.send(user);
            }else{
                collection.find({'username':username, 'pwd':pwd}).toArray((err,data)=>{
                    console.log(data[0].username);
                    user.email = data[0].email;
                    user.username = data[0].username;
                    user.id = data[0].id;
                    user.role = data[0].role;
                    user.valid = true;
                    res.send(user);
                });
            }
        });
    });

    app.post('/api/userdata', function(req, res){
        let jsonData = fs.readFileSync(path.join(__dirname, '../database.json'),'utf-8');
        let database = JSON.parse(jsonData);
        console.log(req.body.username);
        // Loop through accounts
        let userdata = {};
        for (let i=0; i < database.users.length; i++){
            if (req.body.username == database.users[i].username){
                userdata = database.users[i].groups;
            }
        }
        console.log(userdata);
        res.send(userdata);
    });

    app.post('/api/groupdata', function(req, res){
        let jsonData = fs.readFileSync(path.join(__dirname, '../database.json'),'utf-8');
        let database = JSON.parse(jsonData);
        // Loop through accounts
        let groupdata = database.groups;
        console.log(groupdata);
        res.send(groupdata);
    });

    app.post('/api/sendmsg', function(req, res){
        let jsonData = fs.readFileSync(path.join(__dirname, '../database.json'),'utf-8');
        let database = JSON.parse(jsonData);
        let status = {};
        status.valid = false;
        // Add message to group message history
        console.log(req.body.username);
        console.log(req.body.message);
        console.log(req.body.group);
        console.log(req.body.roomname);
        for (let i=0; i < database.groups.length; i++){
            if (database.groups[i].groupname == req.body.group){
                for (let j=0; j < database.groups[i].rooms.length; j++){
                    if (database.groups[i].rooms[j].roomname == req.body.roomname){
                        database.groups[i].rooms[j].history.push({"user": req.body.username, "message": req.body.message});
                        let towrite = JSON.stringify(database);
                        console.log(towrite);
                        fs.writeFileSync(path.join(__dirname, '../database.json'), towrite, 'utf-8');
                        status.valid = true;
                    }
                }
            }
        }
        res.send(status);
    });
}