module.exports = function(db,app){
    app.post('/api/deletegroup', function(req, res){
        groupname = req.body.group;
        console.log(groupname);
        const collection = db.collection('groups');
        collection.deleteOne({name:groupname.name},(err,data)=>{
            res.send(data);
        });
    });
}