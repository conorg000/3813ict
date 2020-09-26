module.exports = function(db,app){
    app.post('/api/addusergroup', function(req,res){
        if(!req.body){
            return res.sendStatus(400)
        }
        console.log(req.body);
        user = req.body.username;
        group = req.body.group;
        const collection = db.collection('groups');
        newmembers = [];
        if (group.groupmembers.includes(user)){
            res.send({'ok':false});
        }else{
            newmembers = group.groupmembers;
            newmembers.push(user);
            collection.updateOne({'name':group.name}, {$set:{groupmembers:newmembers}},(data)=>{
                res.send(data);
            }); 
        }
    });
}