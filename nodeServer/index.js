//Node server which will handle socket.io to connections.
const io=require('socket.io')(8000,{
    cors: {
        origin: ["http://localhost:5500", "http://127.0.0.1:5500"],  
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true
    }
});

const users={};
console.log('Connected to the server');
io.on('connection',socket=>{
    console.log('Connected to the server');
    socket.on('new-user-joined',name=>{
        console.log("New user",name);
            users[socket.id]=name;
            socket.broadcast.emit('user-joined',name);
    })

    socket.on('send',message=>{
        console.log('Message received');
        socket.broadcast.emit('receive',{message: message,name: users[socket.id]})
    });

    socket.on('disconnect',message=>{
        console.log('Disconnected');
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id]
    });
});