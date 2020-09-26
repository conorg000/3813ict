module.exports = function(db,app){
    app.post('/api/removeusergroup', function(req, res){
        group = req.body.group;
        toremove = req.body.username;
        console.log(group);
        //console.log(newrooms);
        //newrooms.remove(roomname);
        newmembers = group.groupmembers.filter(item => item !== toremove);
        console.log(newmembers);
        const collection = db.collection('groups');
        collection.updateOne({'name':group.name}, {$set:{groupmembers:newmembers}},(data)=>{
            console.log(data);
        });

        // Get group.rooms
        // For each room
        // if username in roommembers
        //      remove from array
        //      updateOne with new array
        //
        rooms = group.rooms;
        for (var i=0; i < rooms.length; i++){
            if (rooms[i].roommembers.includes(toremove)){
                newmembers = rooms[i].roommembers.filter(item => item !== toremove);
                collection.updateOne({'name':rooms[i].parent, 'rooms.name':rooms[i].name}, {$set:{'rooms.$.roommembers':newmembers}}, (data)=>{
                    console.log(data);
                });
            }
        }
    });
}