module.exports = function(db,app){
    app.post('/api/removeuserroom', function(req, res){
        room = req.body.room;
        toremove = req.body.username;
        //console.log(newrooms);
        //newrooms.remove(roomname);
        newmembers = room.roommembers.filter(item => item !== toremove);
        console.log(newmembers);
        console.log(room.parent);
        const collection = db.collection('groups');
        collection.updateOne({'name':room.parent, 'rooms.name':room.name}, {$set:{'rooms.$.roommembers':newmembers}},(data)=>{
            console.log(data);
        });
    });
}