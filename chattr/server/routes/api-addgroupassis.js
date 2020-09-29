module.exports = function(db,app){
    app.post('/api/addgroupassis', function(req,res){
        if(!req.body || req.body.groupassis == ''){
            return res.sendStatus(400)
        }else{
            console.log(req.body);
            user = req.body.groupassis;
            group = req.body.group;
            const collection = db.collection('groups');
            newmgroupassis = [];
            if (group.groupassis.includes(user)){
                res.send({'ok':false});
            }else{
                newmgroupassis = group.groupassis;
                newmgroupassis.push(user);
                collection.updateOne({'name':group.name}, {$set:{groupassis:newmgroupassis}},(data)=>{
                    res.send(data);
                }); 
            }
        }
    });
}