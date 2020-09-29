module.exports = function(db,app){
    app.post('/api/removegroupassis', function(req, res){
        group = req.body.group;
        toremove = req.body.groupassis;
        console.log(group);
        //console.log(newrooms);
        //newrooms.remove(roomname);
        newgroupassis = group.groupassis.filter(item => item !== toremove);
        console.log(newgroupassis);
        const collection = db.collection('groups');
        collection.updateOne({'name':group.name}, {$set:{groupassis:newgroupassis}},(data)=>{
            console.log(data);
        });
    });
}