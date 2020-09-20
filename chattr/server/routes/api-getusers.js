module.exports = function(db,app){
    app.get('/api/getusers', function(req,res){
        console.log('Fetching users');
        const collection = db.collection('users');
        collection.find({}).toArray((err,data)=>{
            res.send(data);
        });
    });
}