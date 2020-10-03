module.exports = function(db,app){
    app.post('/api/adduser', function(req,res){
        if(!req.body || req.body.email == '' || req.body.id == '' || req.body.username == '' || req.body.role == '' || req.body.pwd == ''){
            return res.sendStatus(400)
        }else{
            var user = req.body;
            console.log(user);
            const collection = db.collection('users');
            collection.find({'id':user.id}).count((err,count)=>{
                if (count==0){
                    collection.insertOne(user,(err,dbres)=>{
                        if (err) throw err;
                        let num = dbres.insertedCount;
                        res.send({'num':num,err:null});
                    })
                }else{
                    res.send({num:0,err:"duplicate item"});
                }
            });
        }
    });
}