module.exports = {
    connect: function(io, PORT){
        io.on('connection', (socket) => {
            console.log('connection on port '+ PORT + ' : ' + socket.id);

            socket.on('username', (username)=>{
                io.emit('username', username);
            })

            socket.on('message', (message)=>{
                io.emit('message', message);
            })
        });
    }
}