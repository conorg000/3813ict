module.exports = {
    // Connect to sockets
    connect: function(io, PORT){
        io.on('connection', (socket) => {
            console.log('connection on port '+ PORT + ' : ' + socket.id);

            // Send username to other users
            socket.on('username', (username)=>{
                io.emit('username', username);
            })

            // Send message to other users
            socket.on('message', (message)=>{
                io.emit('message', message);
            })
        });
    }
}