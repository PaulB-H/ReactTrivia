const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(cors());
// app.use(bodyParser.json());

// mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
// const connection = mongoose.connection;

// connection.once('open', function(){
//     console.log("MongoDB database connection established successfully");
// })

server.listen(PORT, function() {
    console.log("Server listening on PORT " + PORT);
});

io.on('connection', (socket) => {
    console.log(`user ${socket.id} connected`);
    socket.on(`disconnect`, ()=>{
        console.log(`user ${socket.id} disconnected`);
    });

    socket.on('create game', (msg) => {
        console.log(msg);
        socket.join(msg.gameID);
    });

    socket.on('player joined', async function (msg) {
        console.log(msg);
        var reply = {
            playerName: msg.playerName,
            id: socket.id
        };
        try {
            socket.join(msg.gameID);
            io.in(msg.gameID).emit('player joined', reply);
            socket.emit('game started')
        } catch {
            socket.emit('Room not found');
        };
    });

    socket.on('start game', async function (msg) {
        var questions = await axios("https://opentdb.com/api.php?amount=3&category=9&difficulty=medium&type=multiple");
        socket.emit('question answer', questions.data.results);
        var rooms = socket.rooms;
        var roomID = rooms[Object.keys(socket.rooms)[0]];
        io.in(roomID).emit('game started');

    });
    
    socket.on('submit answer', (msg) => {
        console.log(msg);
        var response = {
            id: socket.id,
            answer: msg.answer,
            timeRemaining: msg.timeRemaining
        };
        console.log(response);
        var rooms = socket.rooms;
        var roomID = rooms[Object.keys(rooms)[0]];
        io.in(roomID).emit('receive answer', response);
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

    socket.on('next question', () => {
        var rooms = socket.rooms;
        var roomID = rooms[Object.keys(socket.rooms)[0]];
        io.in(roomID).emit('next question');
    });

    socket.on('game finished', (msg) => {
        console.log(`game finished message ${msg}`);
        console.log(msg.playerlist)
        for ([i,player] of msg.playerlist.entries()) {
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

// todoRoutes('/').get(function(req, res){
//     Todo.find(function(err, todos) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.json(todos);
//         }
//     });
// });

// todoRoutes.route('/:id').get(function(req, res) {
//     let id = req.params.id;
//     Todo.findById(id, function(err, todo) {
//         res.json(todo);
//     });
// });

// todoRoutes.route('/update/:id').post(function(req, res) {
//     Todo.findById(req.params.id, function(err, todo) {
//         if (!todo)
//             res.status(404).send("data is not found");
//         else
//             todo.todo_description = req.body.todo_description;
//             todo.todo_responsible = req.body.todo_responsible;
//             todo.todo_priority = req.body.todo_priority;
//             todo.todo_completed = req.body.todo_completed;
//         todo.save().then(todo => {
//             res.json('Todo updated!');
//         })
//         .catch(err => {
//             res.status(400).send("Update not possible")
//         });
//     });
// });

// todoRoutes.route('/add').post(function(req, res) {
//     let todo = new Todo(req.body);
//     todo.save()
//         .then(todo => {
//             res.status(200).json({'todo': 'todo added successfully'});
//         })
//         .catch(err => {
//             res.status(400).send('adding new todo failed')
//         });
// });

// app.use('/todos', todoRoutes);

// app.listen(PORT, function() {
//     console.log("Server is running on Port: " + PORT);
// });