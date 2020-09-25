module.exports = function(db,app){
    app.post('/api/deleteroom', function(req, res){
        group = req.body.group;
        roomname = req.body.room;
        console.log(roomname);
        newrooms = group.rooms;
        console.log(newrooms);
        //newrooms.remove(roomname);
        newrooms = newrooms.filter(item => item !== roomname);
        const collection = db.collection('groups');
        collection.updateOne({'name':group.name}, {$set:{rooms:newrooms}},(data)=>{
            res.send(data);
        }); 
    });
}