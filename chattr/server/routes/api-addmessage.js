module.exports = function(db,app){
    app.post('/api/addmessage', function(req,res){
        if(!req.body){
            return res.sendStatus(400)
        }else{
            msg = req.body.message;
            console.log(msg);
            const collection = db.collection('groups');
            collection.updateOne({'name':msg.group, 'rooms.name':msg.room}, {$push:{'rooms.$.chat':msg}}),(data)=>{
                res.send(data);
            }
        }
    });
}