module.exports = function(db,app){
    // Add a message to the room chat history
    app.post('/api/addmessage', function(req,res){
        if(!req.body){
            return res.sendStatus(400)
        }else{
            console.log(req.body);
            msg = req.body.message;
            console.log(msg);
            const collection = db.collection('groups');
            collection.updateOne({'name':msg.group, 'rooms.name':msg.room}, {$push:{'rooms.$.chat':msg}}),(data)=>{
                console.log(data);
                res.send(data);
            }
        }
    });
}