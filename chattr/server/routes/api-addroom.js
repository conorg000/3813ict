module.exports = function(db,app){
    app.post('/api/addroom', function(req,res){
        if(!req.body){
            return res.sendStatus(400)
        }
        group = req.body.group;
        newroom = req.body.newroom;
        console.log(group);
        console.log(newroom);
        const collection = db.collection('groups');
        if (group.rooms.includes(newroom)){
            res.send({'ok':false});
        }else{
            current = group.rooms;
            current.push(newroom);
            collection.updateOne({'name':group.name}, {$set:{rooms:current}},(data)=>{
                res.send(data);
            }); 
        }
    });
        //console.log(current);
}