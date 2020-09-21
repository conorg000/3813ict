module.exports = function(db,app){
    app.post('/api/deleteuser', function(req, res){
        userID = req.body.id;
        console.log('Deleting User with ID ' + userID);
        //var objectid = new ObjectID(userID);
        const collection = db.collection('users');
        collection.deleteOne({id:userID},(err,data)=>{
            res.send(data);
        });
    });
}