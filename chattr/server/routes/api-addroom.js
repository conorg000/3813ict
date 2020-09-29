const { groupCollapsed } = require("console");

module.exports = function(db,app){
    app.post('/api/addroom', function(req,res){
        if(!req.body || req.body.newroom.name == ''){
            return res.sendStatus(400)
        }else{
            group = req.body.group;
            newroom = req.body.newroom;
            rooms = [];
            console.log(group);
            for (i=0; i < group.rooms.length; i++){
                console.log(group.rooms[i].name);
                rooms.push(group.rooms[i].name);
            }
            //console.log(rooms);
            //console.log(newroom);
            const collection = db.collection('groups');
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
        //console.log(current);
}