// import React, { Component } from 'react';
// import socketIOClient from "socket.io-client";

// const socket = socketIOClient("localhost:8080");

// export default class MainPage extends Component {

//     constructor(props) {
//         super(props);

//         this.state = {
//             countdown: 0,
//             counter: 0,
//             questionComplete: false,
//             correctPlayers: '',
//             incorrectPlayers: '',
//             game: {
//                 quiz: [
//                     {
//                     "category": "General Knowledge",
//                     "type": "multiple",
//                     "difficulty": "medium",
//                     "question": "What is the German word for spoon?",
//                     "correct_answer": "L&ouml;ffel",
//                     "incorrect_answers": [
//                         "Gabel",
//                         "Messer",
//                         "Essst&auml;bchen"
//                     ]
//                     },
//                     {
//                     "category": "General Knowledge",
//                     "type": "multiple",
//                     "difficulty": "medium",
//                     "question": "On average, Americans consume 100 pounds of what per second?",
//                     "correct_answer": "Chocolate",
//                     "incorrect_answers": [
//                         "Potatoes",
//                         "Donuts",
//                         "Cocaine"
//                     ]
//                     }
//                 ]
//             }
//         }
//     }

//     componentDidMount() {
//         this.setState({
//             countdown: 10
//         });
//         var playerIDs = {
//             correct: [],
//             incorrect: []
//         }
//         //receiving answers from players and buildings correct/incorrect lists
//         socket.on('receive answer', (msg) => {
//             var pointsThisRound = 0;
//             var answerComponent = 0;
//             console.log(msg);
//             if (msg.answer == "D") {
//                 answerComponent = 1000;
//                 console.log("correct answer")
//             };
//             var timeComponent = this.state.countdown * 10;
//             pointsThisRound = answerComponent + timeComponent;
//             for (this.state.player of this.state.game.playerlist) {
//                 if (this.state.player.id == msg.id) {
//                     this.state.player.points = this.state.player.points + pointsThisRound;
//                     if (answerComponent == 1000) {
//                         console.log("correct");
//                         this.state.correctPlayers.push(this.state.player.name);
//                         playerIDs.correct.push(this.state.player.id);
//                     }
//                     else {
//                         this.state.incorrectPlayers.push(this.state.player.name);
//                         playerIDs.incorrect.push(this.state.player.id);
//                     };
//                 };
//             };
//         });
//         //countdown timer
//         var x = setInterval( () => {
//             this.setState({
//                 countdown: this.state.countdown - 1
//             })
//             if (this.state.countdown <= 0) {
//                 //time up: stop timer and send out correct/incorrect
//                 clearInterval(x);
//                 socket.emit('send results', playerIDs);
//                 this.setState({
//                     questionComplete: true
//                 })
//             };
//         }, 1000);
        
//     }
    
//     render() {
//         return (
//             <div style={{height: "100vh"}}>
//                 {this.state.questionComplete === false
//                 ?
//                     <div>
//                         <div className="d-flex justify-content-center align-items-center" style={{height: "40vh", width: "100vw", backgroundColor: "orange", color: "white"}}> 
//                             <div>
//                                 <div className="d-flex justify-content-center align-items-center" style={{fontSize: 20}}>Time Remaining: {this.state.countdown}</div>
//                                 <p style={{fontSize: 34}}>{this.state.game.quiz[this.state.counter].question}</p>
//                             </div>
//                         </div>
//                         <div style={{height: "30vh"}}>
//                             <button className="btn btn-primary" style={{width: "50vw", height: "30vh", fontSize: 26}} onClick={this.submitAnswer}>A: {this.state.game.quiz[this.state.counter].incorrect_answers[0]} </button>
//                             <button className="btn btn-info" style={{width: "50vw", height: "30vh", fontSize: 26}} onClick={this.submitAnswer}>B: {this.state.game.quiz[this.state.counter].incorrect_answers[1]}</button>
//                         </div>
//                         <div style={{height: "30vh"}}>
//                             <button className="btn btn-secondary" style={{width: "50vw", height: "30vh", fontSize: 26}} onClick={this.submitAnswer}>C: {this.state.game.quiz[this.state.counter].incorrect_answers[2]}</button>
//                             <button className="btn btn-warning" style={{width: "50vw", height: "30vh", fontSize: 26, color: "white"}} onClick={this.submitAnswer}>D: {this.state.game.quiz[this.state.counter].correct_answer}</button>
//                         </div> 
//                     </div>
//                 :
//                     <div style={{height: "100vh", width: "100vw", backgroundColor: "orange", color: "white"}}>
//                         <div>These people got it right: {this.state.correctPlayers}</div>
//                         <div>These people got it wrong: {this.state.incorrectPlayers}</div>
//                         <button onClick></button>
//                     </div>
//                 }
                
//             </div>
//         )
//     }
// }