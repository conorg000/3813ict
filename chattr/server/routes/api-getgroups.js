module.exports = function(db,app){
    app.get('/api/getgroups', function(req,res){
        //console.log('Fetching users');
        const collection = db.collection('groups');
        collection.find({}).toArray((err,data)=>{
            res.send(data);
        });
    });
}