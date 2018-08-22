const path = require('path');
const http = require('http');

const express = require('express');
const socetIO = require('socket.io');


const {generateMessage, generateLocationMessage} = require('./utils/message');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socetIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket)=>{
    console.log("new user connected ");

    socket.emit("newMessage", generateMessage('admin', 'welcome to the chat app'));

    socket.broadcast.emit("newMessage",generateMessage('admin', 'new user joined th chat') );



    socket.on("createMessage", (message, callback) => {
        console.log('createMessage',message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback("this is from server");
    });

    socket.on("createLocationMessage",(coords)=>{
        io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude, coords.longitude))
    })



    socket.on("disconnect",()=>{
        console.log("user is disconnected")
    })
});

server.listen(port,()=>{
    console.log(`server is up on ${port}`);
});



