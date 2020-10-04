module.exports = function(db,app){
    // Add room to Mongo
    app.post('/api/addroom', function(req,res){
        // Don't allow blank names
        if(!req.body || req.body.newroom.name == ''){
            return res.sendStatus(400)
        }else{
            group = req.body.group;
            newroom = req.body.newroom;
            rooms = [];
            console.log(group);
            // Get list of group's rooms
            for (i=0; i < group.rooms.length; i++){
                console.log(group.rooms[i].name);
                rooms.push(group.rooms[i].name);
            }
            const collection = db.collection('groups');
            // If group already has this room, send back error
            // Else, add new room to array of rooms and set in Mongo
            if (rooms.includes(newroom.name)){
                res.send({'ok':false});
            }else{
                current = group.rooms;
                current.push(newroom);
                collection.updateOne({'name':group.name}, {$set:{rooms:current}},(data)=>{
                    res.send(data);
                }); 
            }
        }
    });
}