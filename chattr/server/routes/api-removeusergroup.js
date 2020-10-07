module.exports = function(db,app){
    // Remove user from group and any rooms
    app.post('/api/removeusergroup', function(req, res){
        group = req.body.group;
        toremove = req.body.username;
        console.log(group);
        // Remove target user from groupmembers
        newmembers = group.groupmembers.filter(item => item !== toremove);
        console.log(newmembers);
        const collection = db.collection('groups');
        collection.updateOne({'name':group.name}, {$set:{groupmembers:newmembers}},(data)=>{
            res.send(data);
        });
        // For each room in group
        // if username in roommembers
        //      remove from array
        //      updateOne with new array
        rooms = group.rooms;
        for (var i=0; i < rooms.length; i++){
            if (rooms[i].roommembers.includes(toremove)){
                newmembers = rooms[i].roommembers.filter(item => item !== toremove);
                collection.updateOne({'name':rooms[i].parent, 'rooms.name':rooms[i].name}, {$set:{'rooms.$.roommembers':newmembers}}, (data)=>{
                    res.send(data);
                });
            }
        }
    });
}