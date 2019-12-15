import React, { Component } from 'react';

export default class MainPage extends Component {

    constructor(props) {
        super(props);

        this.updateRoomID = this.updateRoomID.bind(this);
        this.updateName = this.updateName.bind(this);

        this.state = {
            name: '',
            roomID: ''
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

    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }

    joinGame() {
        
    }
    
    render() {
        return (
            <div className="d-flex align-items-center justify-content-center" style={{height: "100vh"}}> 
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
                <button onClick={joinGame}>Join Room</button>
                </div>
            </div>
        )
    }
}