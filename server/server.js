const path = require('path');
const http = require('http');

const express = require('express');
const socetIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public')

var app = express();
var server = http.createServer(app);
var io = socetIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket)=>{
    console.log("new user");

    socket.emit("newMessage",{
        from:'xxx@gmail.com',
        text:"absd",
        createAt:12
    });

    socket.on("createMessage",(newMessage)=>{
        console.log('new message',newMessage)
    });

    socket.on("disconnect",()=>{
        console.log("user is disconnected")
    })
});

server.listen(port,()=>{
    console.log(`server is up on ${port}`);
});



