var socket = io();

socket.on('connect', function(){
    console.log('connected to server')

    socket.emit('createMessage', {
        from:"sentfromfront@gmail.com",
        text:"message si sucseesful "

    });
});

socket.on('disconnect', function(){
    console.log('disconnected from server')
});

// socket.on('newMessage', function(message){
//     console.log('new message', message)
// });

socket.on('greetingMessage', function(message){
    console.log('new message', message)
});


