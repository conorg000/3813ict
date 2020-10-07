module.exports = function(db,app){
    // Remove user from room
    app.post('/api/removeuserroom', function(req, res){
        room = req.body.room;
        toremove = req.body.username;
        // Remove target user from array of roommmembers
        // Put new array in db
        newmembers = room.roommembers.filter(item => item !== toremove);
        console.log(newmembers);
        console.log(room.parent);
        const collection = db.collection('groups');
        collection.updateOne({'name':room.parent, 'rooms.name':room.name}, {$set:{'rooms.$.roommembers':newmembers}},(data)=>{
            res.send(data);
        });
    });
}