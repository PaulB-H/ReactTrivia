import React, { Component } from 'react';
import socketIOClient from "socket.io-client";


const socket = socketIOClient();


export default class MainPage extends Component {

    constructor(props) {
        super(props);

        this.submitAnswer = this.submitAnswer.bind(this);
        this.updateRoomID = this.updateRoomID.bind(this);
        this.updateName = this.updateName.bind(this);
        this.joinGame = this.joinGame.bind(this);

        this.state = {
            name: '',
            roomID: '',
            joined: false,
            gameStatus: 'Not Started',
            answer: '',
            color: '',
            result: '',
            finalResult: '',
        }
    }

    updateName(e) {
        this.setState({
            name: e.target.value
        });
    }

    updateRoomID(e) {
        this.setState({
            roomID: e.target.value
        });
    }

    joinGame() {
        var info = {
            playerName: this.state.name,
            gameID: this.state.roomID
        };
        console.log(info);
        socket.emit('player joined', info);
        console.log('player joined');
        this.setState({
            joined: true
        });
        console.log(this.state);
        socket.on('game started', () => {
            this.setState({
                gameStatus: "Started"
            })
        });
    }

    submitAnswer(e) {
        this.setState({
            answer: e.currentTarget.textContent,
            color: e.currentTarget.className
        }, () => {
            console.log(this.state)
            var data = {
                answer: this.state.answer,
                roomID: this.state.roomID
            };
            console.log(data);
            socket.emit('submit answer', data)
            socket.on('receive results', (msg) =>{
                this.setState({
                    result: msg
                })
            });
            socket.on('next question', () => {
                console.log("")
                this.setState({
                    answer: '',
                    result:  ''
                })
            });
            socket.on('final score', (msg) => {
                console.log("game finished")
                this.setState({
                    finalResult: msg
                })
                console.log(this.state)
            })
        })
    }

    render() {
        return (
            <div className="d-flex align-items-center justify-content-center" style={{flexDirection:"column", height: "100vh", width: "100vw", backgroundColor: "orange", color: "white"}}> 
                {(this.state.joined ===false)
                ? 
                    <div className="d-flex align-items-center justify-content-center" style={{flexDirection:"column"}}>
                        <h3 className="mb-2">Player Name</h3>
                        <input
                            value={this.state.name}
                            onChange={this.updateName}
                        />
                        <h3 className="mb-2 mt-3">Room ID</h3>
                        <input                                 
                            value={this.state.roomID}
                            onChange={this.updateRoomID}
                        />
                        <button className="btn btn-primary mt-3" style={{display: "block"}} onClick={this.joinGame}>Join Room</button>
                    </div>
                :
                    (this.state.gameStatus === "Not Started")
                    ?
                        <div className="text-center">
                            <h5>You've joined the room! Waiting for game to start...</h5>
                        </div>
                    :
                        // <div className="d-flex justify-content-center" style={{height: "100vh"}}>
                            (this.state.answer === '')
                            ?
                                <div style={{height: "100vh"}}> 
                                    <div className="row">
                                        <button className="btn btn-primary" style={{width: "50vw", height: "50vh"}} onClick={this.submitAnswer}>A</button>
                                        <button className="btn btn-info" style={{width: "50vw", height: "50vh"}} onClick={this.submitAnswer}>B</button>
                                    </div>
                                    <div className="row">
                                        <button className="btn btn-secondary" style={{width: "50vw", height: "50vh"}} onClick={this.submitAnswer}>C</button>
                                        <button className="btn btn-warning" style={{width: "50vw", height: "50vh"}} onClick={this.submitAnswer}>D</button>
                                    </div>
                                </div>
                            :
                                this.state.result === ''
                                ?
                                    <div className='d-flex justify-content-center align-items-center'> 
                                        <div className={this.state.color} style={{height: "100vh", width: "100vw", color: "white", flexDirection:"column", backgroundColor:"primary"}}>
                                            {/* <div className='d-flex justify-content-center align-items-center'> */}
                                                <h4>You chose answer {this.state.answer}</h4>
                                            {/* </div> */}
                                        </div>
                                    </div>
                                :
                                    this.state.result === 'Correct' && this.state.finalResult === ''
                                    ?
                                        <div className='d-flex justify-content-center align-items-center btn btn-success' style={{height: "100vh", width: "100vw"}}>
                                            <h4>You were correct!!</h4>
                                        </div>
                                    :
                                        this.state.finalResult === ''
                                        ?
                                            <div className='d-flex justify-content-center align-items-center btn btn-danger' style={{height: "100vh", width: "100vw"}}>
                                                <h4>You were wrong...</h4>
                                            </div> 
                                        :
                                            <div className='d-flex justify-content-center align-items-center btn btn-success' style={{height: "100vh", width: "100vw"}}>
                                                <h4>Congratulations! You came in place # {this.state.finalResult.placement+1} with {this.state.finalResult.points} points!</h4>
                                            </div> 
                            // </div>
                }
            </div>

                
        )
    }
}