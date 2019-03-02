const express=require('express');
const app=express();
const socket=require('socket.io')

app.use(express.static('public'));
const server=app.listen(3000);

const io=socket(server);

const users={};

// Gameplay Variables
const turn=true;


io.on('connection',function(socket){
    socket.on('new-user',function(username,callback){
        if(username in users){
            callback(false);
            // console.log( 'Username Already Exists');
        }else{
            callback(true)
            socket.username=username;
            users[socket.username]=socket.id;
            sendUsername();
        }
    });
    function sendUsername(){
        io.emit('usernames',users);
    }


    // Make Move Event
    socket.on('make-move',function(data){
        // data=turn,value,cellId
        io.emit('move-player',data);
    })
})