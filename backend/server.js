const path = require('path');
const express = require('express');
const app = express();

const server = require('http').Server(app);
const socketIO = require('socket.io');
const io = socketIO(server, { origin: "*:*" });

const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

server.listen(PORT, function() {
    console.log("Server listening on PORT " + PORT);
});

app.get("/", function (req, res) {
    console.log("send")
    // res.send("API is working")
    res.sendFile(path.resolve(__dirname + "/../public/index.html"))
});

io.on('connection', (socket) => {
    console.log(`user ${socket.id} connected`);
    socket.on(`disconnect`, ()=>{
        console.log(`user ${socket.id} disconnected`);
    });

    socket.on('create game', (msg) => {
        socket.join(msg);
        console.log(`${socket.id}host created and joined room ${msg}`);
        console.log(io.sockets.adapter.rooms)
        console.log(socket.rooms)
    });

    socket.on('player joined', async function (msg) {
        console.log(msg);
        var reply = {
            playerName: msg.playerName,
            id: socket.id
        };
            socket.join(msg.gameID);
            io.in(msg.gameID).emit('player joined', reply);
            console.log("joined room")
    });

    socket.on('start game', async function (msg) {
        var rooms = socket.rooms;
        var roomID = rooms[Object.keys(socket.rooms)[0]];
        io.in(roomID).emit('game started');
    });
    
    socket.on('submit answer', (msg) => {
        console.log(msg);
        var response = {
            id: socket.id,
            answer: msg.answer,
        };
        // console.log(response);
        // var rooms = socket.rooms;
        // console.log(rooms)
        // var roomID = rooms[Object.keys(rooms)[0]];
        // console.log(roomID)
        io.in(msg.roomID).emit('receive answer', response);
    });

    socket.on('send results', (msg) => {
        console.log(msg);
        for (correctID of msg.correct) {
            io.to(`${correctID}`).emit('receive results', 'Correct');
        };
        for (incorrectID of msg.incorrect) { 
            io.to(`${incorrectID}`).emit('receive results', 'Incorrect');
        };
    });

    socket.on('next question', (msg) => {
        console.log(msg)
        console.log("next question time")
        io.in(msg).emit('next question');
    });

    socket.on('game finished', (msg) => {
        console.log(`game finished message ${msg}`);
        console.log(msg)
        for ([i,player] of msg.entries()) {
            let result = {
                placement: i,
                points: player.points
            };
            console.log(result)
            console.log(player.id)
            io.to(player.id).emit('final score', result);
        };
    });

});