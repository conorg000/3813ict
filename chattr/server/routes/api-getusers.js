module.exports = function(db,app){
    // Get users from db, return as array
    app.get('/api/getusers', function(req,res){
        //console.log('Fetching users');
        const collection = db.collection('users');
        collection.find({}).toArray((err,data)=>{
            res.send(data);
        });
    });
}