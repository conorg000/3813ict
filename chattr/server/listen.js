// Start server
module.exports = {
    listen: function(app, PORT){
        app.listen(PORT, ()=>{
            var d = new Date();
            var h = d.getHours();
            var m = d.getMinutes();
            console.log('Server started at : ' + h + ' : ' + m);
        });
    }
}