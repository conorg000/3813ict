module.exports = function(db,app){
    // Delete group's room
    app.post('/api/deleteroom', function(req, res){
        group = req.body.group;
        room = req.body.room;
        console.log(room);
        newrooms = group.rooms;
        console.log(newrooms);
        // Remove target room from array of rooms
        // Set new array in db
        newrooms = newrooms.filter(item => item.name !== room.name);
        console.log(newrooms);
        const collection = db.collection('groups');
        collection.updateOne({'name':group.name}, {$set:{rooms:newrooms}},(data)=>{
            res.send(data);
        }); 
    });
}