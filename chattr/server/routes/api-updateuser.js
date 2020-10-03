module.exports = function(db, app, ObjectID){
    var result;
    app.post('/api/updateuser', function(req, res){
        if (!req.body || req.body.email == '' || req.body.username == '' || req.body.role == '' || req.body.pwd == ''){
            return res.sendStatus(400)
        }
        user = req.body;
        //var objectid = new ObjectID(product.objid);
        const collection = db.collection('users');
        collection.updateOne({id:user.id}, {$set:{email:user.email, username:user.username, role:user.role, pwd:user.pwd}},(data)=>{
            res.send(data);
        });
    });
}

