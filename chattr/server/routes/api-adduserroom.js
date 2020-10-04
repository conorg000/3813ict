module.exports = function(db,app){
    // Add user to room
    app.post('/api/adduserroom', function(req,res){
        if(!req.body || req.body.username == ''){
            return res.sendStatus(400)
        }else{
            console.log(req.body);
            user = req.body.username;
            room = req.body.room;
            group = req.body.group;
            const collection = db.collection('groups');
            newmembers = [];
            // If user exists as a roommmember already, send error
            // Else, add to list of roommmembers
            if (room.roommembers.includes(user)){
                res.send({'ok':false});
            }else{
                console.log(user);
                collection.updateOne({'name':group.name, 'rooms.name':room.name}, {$push:{'rooms.$.roommembers':user}},(data)=>{
                    res.send(data);
                }); 
            }
        }
    });
}