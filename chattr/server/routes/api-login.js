module.exports = function(db,app){
    // Route to check user credentials
    app.post('/api/auth', function(req, res){
        if(!req.body || req.body.username == '' || req.body.pwd == ''){
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
        // Look for user, if doesn't exist, send back object with valid == false
        // Otherwise, send back user data with valid == true
        collection.find({'username':username, 'pwd':pwd}).count((err,count)=>{
            if (count==0){
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
}