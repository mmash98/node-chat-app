const path = require('path');
const http = require('http');

const express = require('express');
const socetIO = require('socket.io');


const {generateMessage} = require('./utils/message');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socetIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket)=>{
    console.log("new user connected ");

    socket.emit("greetingMessage", generateMessage('admin', 'welcome to the chat app'));


    socket.broadcast.emit("greetingMessage",generateMessage('admin', 'new user joined th chat') );



    // socket.emit("newMessage",{
    //     from:'xxx@gmail.com',
    //     text:"absd",
    //     createAt:12
    // });

    socket.on("createMessage",(message)=>{
        console.log('new message',message)
        io.emit('newMessage', generateMessage(message.from, message.text))
    });



    socket.on("disconnect",()=>{
        console.log("user is disconnected")
    })
});

server.listen(port,()=>{
    console.log(`server is up on ${port}`);
});



