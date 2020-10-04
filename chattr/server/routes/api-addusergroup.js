module.exports = function(db,app){
    // Add user to a group
    app.post('/api/addusergroup', function(req,res){
        if(!req.body || req.body.username == ''){
            return res.sendStatus(400)
        }else{
            console.log(req.body);
            user = req.body.username;
            group = req.body.group;
            const collection = db.collection('groups');
            newmembers = [];
            // If the user already exists as a groupmember, send error
            // Else add to array of groupmembers and set in db
            if (group.groupmembers.includes(user)){
                res.send({'ok':false});
            }else{
                newmembers = group.groupmembers;
                newmembers.push(user);
                collection.updateOne({'name':group.name}, {$set:{groupmembers:newmembers}},(data)=>{
                    res.send(data);
                }); 
            }
        }
    });
}