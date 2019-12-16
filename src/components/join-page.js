import React, { Component } from 'react';
import socketIOClient from "socket.io-client";

const socket = socketIOClient("localhost:8080");


export default class MainPage extends Component {

    constructor(props) {
        super(props);

        this.updateRoomID = this.updateRoomID.bind(this);
        this.updateName = this.updateName.bind(this);
        this.joinGame = this.joinGame.bind(this);

        this.state = {
            name: '',
            roomID: '',
            joined: false
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
            window.location.href = '/playeranswer'
        });
    }

    render() {
        return (
            <div className="d-flex align-items-center justify-content-center" style={{height: "100vh"}}> 
                {this.state.joined 
                ? 
                <div>
                    <p>You've joined the room! Waiting for game to start...</p>
                </div>
                :
                <div className="col-3 justify-content-center">
                    <p>Player Name:</p>
                    <div className="row">
                        <input
                            value={this.state.name}
                            onChange={this.updateName}
                        />
                    </div>
                    <p>Room ID:</p>
                    <div className="row">
                        <input                                 
                            value={this.state.roomID}
                            onChange={this.updateRoomID}
                        />
                    </div>
                    <button onClick={this.joinGame}>Join Room</button>
                </div>
                }
            </div>
        )
    }
}