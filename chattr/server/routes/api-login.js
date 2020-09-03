const fs = require("fs");
const path = require('path');

module.exports = function(app){
    // Route to check user credentials
    app.post('/api/auth', function(req, res){
        let jsonData = fs.readFileSync(path.join(__dirname, '../database.json'),'utf-8');
        let database = JSON.parse(jsonData);
        let users = database.users;
        console.log(users);

        // let users = [{'email': 'g.costanza@yahoo.com', 'birthdate': '01-01-2020', 'age': 0, 'username': 'g.costanza@yahoo.com', 'pwd': 'pastrami', 'valid':false},
        //             {'email': 'jane@yahoo.com', 'birthdate': '01-01-1990', 'age': 30, 'username': 'jane11', 'pwd': 'janeee', 'valid':false},
        //             {'email': 'user@yahoo.com', 'birthdate': '01-01-1985', 'age': 35, 'username': 'user@yahoo.com', 'pwd': 'iamuser', 'valid':false}];
        
        if (!req.body){
            return res.sendStatus(400)
        }
        var customer = {};
        customer.email = '';
        customer.username = '';
        customer.pwd = '';
        customer.role = '';
        customer.valid = false;
        // Loop through accounts
        for (let i=0; i < users.length; i++){
            if (req.body.email == users[i].email && req.body.pwd == users[i].pwd){
                customer.email = users[i].email;
                customer.username = users[i].username;
                customer.role = users[i].role;
                customer.valid = true;
            }
        }
        //console.log(customer);
        res.send(customer);
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
}