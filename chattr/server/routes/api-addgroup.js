module.exports = function(db,app){
    app.post('/api/addgroup', function(req,res){
        if(!req.body || req.body.name == ''){
            return res.sendStatus(400)
        }else{
            group = req.body;
            console.log(group);
            const collection = db.collection('groups');
            collection.find({'name':group.name}).count((err,count)=>{
                if (count==0){
                    collection.insertOne(group,(err,dbres)=>{
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