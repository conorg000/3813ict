module.exports = function(db,app){
    // Remove user as group assistant
    app.post('/api/removegroupassis', function(req, res){
        group = req.body.group;
        toremove = req.body.groupassis;
        console.log(group);
        // Remove target user from array of groupassistants
        // Then update in db
        newgroupassis = group.groupassis.filter(item => item !== toremove);
        console.log(newgroupassis);
        const collection = db.collection('groups');
        collection.updateOne({'name':group.name}, {$set:{groupassis:newgroupassis}},(data)=>{
            res.send(data);
        });
    });
}