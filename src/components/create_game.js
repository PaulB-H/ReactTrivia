import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import axios from 'axios';

const socket = socketIOClient(window.location.hostname)

// ws://evening-beach-84352.herokuapp.com/socket.io/?EIO=4&transport=websocket

// const socket = socketIOClient(":8080")


export default class Create_Game extends Component {

    constructor(props) {
        super(props);

        this.onChangeGame_question_amount = this.onChangeGame_question_amount.bind(this);
        this.onChangeGame_category = this.onChangeGame_category.bind(this);
        this.onChangeGame_difficulty = this.onChangeGame_difficulty.bind(this);
        this.startQuestions = this.startQuestions.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            roomID: '',
            game_question_amount: '',
            game_category: '',
            game_difficulty: '',
            playerlist: [],
            quiz: [],
            gameStatus: 'Not Started',
            countdown: 0,
            counter: -1,
            questionComplete: false,
            correctPlayers: '',
            incorrectPlayers: '',
            array: [1,2,3,4],
        }
    }

    componentDidMount() {
        console.log(this.state)
    }

    onChangeGame_question_amount(e) {
        this.setState({
            game_question_amount: e.target.value
        });
    }

    onChangeGame_category(e) {
        this.setState({
            game_category: e.target.value
        });
    }

    onChangeGame_difficulty(e) {
        this.setState({
            game_difficulty: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        var results = [{
            "category": "General Knowledge",
            "type": "multiple",
            "difficulty": "medium",
            "question": "What is the name of the very first video uploaded to YouTube?",
            "correct_answer": "Me at the zoo",
            "incorrect_answers": [
              "tribute",
              "carrie rides a truck",
              "Her new puppy from great grandpa vern."
            ]
          },
          {
            "category": "General Knowledge",
            "type": "multiple",
            "difficulty": "medium",
            "question": "In 2013 how much money was lost by Nigerian scams?",
            "correct_answer": "$12.7 Billion",
            "incorrect_answers": [
              "$95 Million",
              "$956 Million",
              "$2.7 Billion"
            ]
          },
          {
            "category": "General Knowledge",
            "type": "multiple",
            "difficulty": "medium",
            "question": "Which of these companies does NOT manufacture automobiles?",
            "correct_answer": "Ducati",
            "incorrect_answers": [
              "Nissan",
              "GMC",
              "Fiat"
            ]
          }];
        axios.get(`https://opentdb.com/api.php?amount=${this.state.game_question_amount}&category=${this.state.game_category}&difficulty=${this.state.game_difficulty}&type=multiple`)
        .then(res => {
            this.setState({
                quiz: results,
                roomID: Math.round(Math.random()*100000)
            });
            socket.emit('create game', this.state.roomID);
            socket.on('player joined', (msg) => {
                console.log(this.state)
                this.setState({ 
                    playerlist: [...this.state.playerlist, {
                        name: msg.playerName,
                        points: 0,
                        id: msg.id
                    }] 
                }) 
                console.log(this.state)
            })
        });
    }

    startQuestions() {
        //only when game starts
        // if (this.state.counter == -1) {
        //     this.setState({
        //         gameStatus: "Started",
        //     });
        //     socket.emit('start game');
        // } else {
        //     socket.emit('next question', this.state.roomID);
        // }
        this.setState({
            counter: this.state.counter + 1,
        }, () => {
            console.log(this.state)
            if (this.state.counter < this.state.quiz.length) {
                console.log("more questions")
                if (this.state.counter == 0) {
                    this.setState({
                        gameStatus: "Started",
                    });
                    socket.emit('start game');
                    console.log("game started")
                } else {
                    socket.emit('next question', this.state.roomID);
                    console.log("next question")
                };
                this.setState({
                    questionComplete: false,
                    correctPlayers: '',
                    incorrectPlayers: '',
                })
                var correctPlayers = []
                var incorrectPlayers = []
                this.setState({
                    countdown: 10
                });
                var playerIDs = {
                    correct: [],
                    incorrect: []
                };
                //receiving answers from players and buildings correct/incorrect lists
                socket.on('receive answer', (msg) => {
                    console.log(msg);
                    var pointsThisRound = 0;
                    var answerComponent = 0;
                    if (msg.answer == "D") {
                        answerComponent = 1000;
                        console.log("correct answer")
                    };
                    var timeComponent = this.state.countdown * 10;
                    pointsThisRound = answerComponent + timeComponent;
                    for (this.state.player of this.state.playerlist) {
                        if (this.state.player.id == msg.id) {
                            this.state.player.points = this.state.player.points + pointsThisRound;
                            if (answerComponent == 1000) {
                                console.log("correct");
                                console.log(this.state.correctPlayers)
                                console.log(this.state.player.name)
                                correctPlayers.push(this.state.player.name)
                                playerIDs.correct.push(this.state.player.id);
                            }
                            else {
                                incorrectPlayers.push(this.state.player.name)
                                playerIDs.incorrect.push(this.state.player.id);
                            };
                        };
                    };
                });
                console.log(this.state)
                //countdown timer
                var x = setInterval( () => {
                    this.setState({
                        countdown: this.state.countdown - 1
                    })
                    if (this.state.countdown <= 0) {
                        //time up: stop timer and send out correct/incorrect
                        clearInterval(x);
                        socket.emit('send results', playerIDs);
                        this.setState({
                            correctPlayers: correctPlayers,
                            incorrectPlayers: incorrectPlayers,
                            questionComplete: true
                        })
                    };
                }, 1000);
            } else {
                var playerlist = this.state.playerlist;
                playerlist.sort(function(a, b){
                    return b.points-a.points;
                });
                socket.emit('game finished', playerlist)
                this.setState({
                    gameStatus: 'Game over',
                    playerlist: playerlist
                })
            }
        })
        
    }

    render() {
        return (
            <div>
            {(this.state.quiz.length === 0) 
            ?
                <div className="d-flex align-items-center justify-content-center" style={{width: "100vw", height: "100vh", backgroundColor: "orange", color: "white"}}>
                    <div style={{ maxWidth: "600px", display: "flex", justifyContent: "center" }}>

                    <form onSubmit={this.onSubmit}>

                        <div className="form-group">
                            <h3>Num of Questions: </h3>
                            <input
                                type="number"
                                min="1"
                                max="20"
                                className="form-control"
                                value={this.state.game_question_amount}
                                onChange={this.onChangeGame_question_amount}
                            />
                        </div>

                        <div className="form-group">
                            <h3 className="d-flex justify-content-around">Category</h3>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="categoryOptions"
                                    id="general"
                                    value="9"
                                    checked={this.state.game_category === '9'}
                                    onChange={this.onChangeGame_category}
                                />
                                <label className="form-check-label">General</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="categoryOptions"
                                    id="books"
                                    value="10"
                                    checked={this.state.game_category === '10'}
                                    onChange={this.onChangeGame_category}
                                />
                                <label className="form-check-label">Books</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="categoryOptions"
                                    id="Film"
                                    value="11"
                                    checked={this.state.game_category === '11'}
                                    onChange={this.onChangeGame_category}
                                />
                                <label className="form-check-label">Film</label>
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <h3 className="d-flex justify-content-around">Difficulty</h3>
                            <div className="d-flex justify-content-around">
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="difficultyOptions"
                                        id="difficultyLow"
                                        value="low"
                                        checked={this.state.game_difficulty === 'low'}
                                        onChange={this.onChangeGame_difficulty}
                                    />
                                    <label className="form-check-label">Low</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="difficultyOptions"
                                        id="difficultyMedium"
                                        value="medium"
                                        checked={this.state.game_difficulty === 'medium'}
                                        onChange={this.onChangeGame_difficulty}
                                    />
                                    <label className="form-check-label">Medium</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="difficultyOptions"
                                        id="difficultyHigh"
                                        value="high"
                                        checked={this.state.game_difficulty === 'high'}
                                        onChange={this.onChangeGame_difficulty}
                                    />
                                    <label className="form-check-label">High</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group d-flex align-items-center justify-content-center">
                            <input type="submit" value="Create Game" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
                </div>
                
            :
            (this.state.gameStatus === 'Not Started')
            ?
                <div className="d-flex align-items-center justify-content-center" style={{height: "100vh", width: "100vw", backgroundColor: "orange", color: "white", fontSize: 24, flexDirection:"column"}}>
                    <h3 className="mb-5" style={{display: "block"}}> Room ID {this.state.roomID}</h3>
                    <div style={{flexDirection:"row !important"}}>
                        {this.state.playerlist.map(player => (
                            <div>{player.name}</div>
                        ))}
                    </div>
                    <p className="mt-5 mb-3">Waiting for players to join...</p>
                    <button className="btn btn-primary mt-3" style={{width: "200px", height: "50px", display: "block"}} onClick={this.startQuestions}>Start Game</button>
                </div>
            : 
            (this.state.gameStatus === 'Started')
            ?
                (this.state.questionComplete === false)
                ?
                    <div>
                        <div className="d-flex justify-content-center align-items-center" style={{height: "40vh", width: "100vw", backgroundColor: "orange", color: "white"}}> 
                            <div>
                                <div className="d-flex justify-content-center align-items-center" style={{fontSize: 20}}>Time Remaining: {this.state.countdown}</div>
                                <p style={{fontSize: 34}}>{this.state.quiz[this.state.counter].question}</p>
                            </div>
                        </div>
                        <div style={{height: "30vh"}}>
                            <button className="btn btn-primary" style={{width: "50vw", height: "30vh", fontSize: 26}} onClick={this.submitAnswer}>A: {this.state.quiz[this.state.counter].incorrect_answers[0]} </button>
                            <button className="btn btn-info" style={{width: "50vw", height: "30vh", fontSize: 26}} onClick={this.submitAnswer}>B: {this.state.quiz[this.state.counter].incorrect_answers[1]}</button>
                        </div>
                        <div style={{height: "30vh"}}>
                            <button className="btn btn-secondary" style={{width: "50vw", height: "30vh", fontSize: 26}} onClick={this.submitAnswer}>C: {this.state.quiz[this.state.counter].incorrect_answers[2]}</button>
                            <button className="btn btn-warning" style={{width: "50vw", height: "30vh", fontSize: 26, color: "white"}} onClick={this.submitAnswer}>D: {this.state.quiz[this.state.counter].correct_answer}</button>
                        </div> 
                    </div>
                :
                    <div className="d-flex align-items-center justify-content-center" style={{height: "100vh", width: "100vw", backgroundColor: "orange", color: "white", flexDirection:"column"}}>
                        <div className="text-center">
                            <h4>These people got it right</h4>
                            {this.state.correctPlayers.map(player => (
                                <h5>{player}</h5>
                            ))}
                        </div>
                        <div className="text-center">
                            <h4>These people got it wrong</h4>
                            {this.state.incorrectPlayers.map(player => (
                                <h5>{player}</h5>
                            ))}
                        </div>
                        <button style="button" className="btn btn-primary" style={{width: "200px", height: "50px", display: "block"}} onClick={this.startQuestions}>Next Question</button>
                    </div>
            :
                <div className="d-flex align-items-center justify-content-center" style={{height: "100vh", width: "100vw", backgroundColor: "orange", color: "white", flexDirection:"column"}}>
                    <h2>Final Scores</h2>
                    {this.state.playerlist.map((player,i) => (
                        <h5>#{i+1} {player.name}: {player.points}</h5>
                    ))}
                </div>
            }
        </div>
        )
    }
}