module.exports = function(db,app){
    app.post('/api/adduserroom', function(req,res){
        if(!req.body){
            return res.sendStatus(400)
        }
        console.log(req.body);
        user = req.body.username;
        room = req.body.room;
        group = req.body.group;
        const collection = db.collection('groups');
        newmembers = [];
        if (room.roommembers.includes(user)){
            res.send({'ok':false});
        }else{
            console.log(user);
            collection.updateOne({'name':group.name, 'rooms.name':room.name}, {$push:{'rooms.$.roommembers':user}},(data)=>{
                res.send(data);
            }); 
        }
    });
}
// db.groups.updateOne({name:'TESTgROUP', "rooms.name": 'a better room'}, {$set:{"rooms.roommembers":['GeorgeCostanza']}})
// db.groups.updateOne({name:'TESTgROUP', "rooms.name": 'a better room'}, {$push:{"rooms.$.roommembers":'GeorgeCostanza'}})