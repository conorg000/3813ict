module.exports = function(db,app){
    // Get groups from Mongodb, return as array
    app.get('/api/getgroups', function(req,res){
        const collection = db.collection('groups');
        collection.find({}).toArray((err,data)=>{
            res.send(data);
        });
    });
}