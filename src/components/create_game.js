import React, { Component } from 'react';
import socketIOclient from "socket.io-client";

const socket = socketIOclient("localHost:8080")

export default class Create_Game extends Component {

    constructor(props) {
        super(props);

        this.onChangeGame_question_amount = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            roomID: '',
            game_question_amount: '',
            game_category: '',
            game_difficulty: '',
            game_type: ''
        }
    }

    onChangeGame_question_amount(e) {
        this.setState({
            todo_description: e.target.value
        });
    }

    onChangeGame_category(e) {
        this.setState({
            todo_responsible: e.target.value
        });
    }

    onChangeGame_type(e) {
        this.setState({
            todo_priority: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form Submitted:`);
        console.log(`Todo Description: ${this.state.game_question_amount}`);
        console.log(`Todo Responsible: ${this.state.game_category}`);
        console.log(`Todo Priority: ${this.state.game_difficulty}`);
        console.log(`Todo Priority: ${this.state.game_type}`);

        this.setState({
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        })
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>

                <div className="form-group">
                    <label>Num of Questions: </label>
                    <input
                        type="number"
                        min="5"
                        max="20"
                        className="form-control"
                        value={this.state.game_question_amount}
                        onChange={this.onChangeGame_question_amount}
                    />
                </div>

                <div class="dropdown show">
                    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" value={this.state.game_category} onChange={this.onChangeGame_category}>
                        Catagories
                    </a>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <a class="dropdown-item" href="#" val="9">General</a>
                        <a class="dropdown-item" href="#" val="10">Books</a>
                        <a class="dropdown-item" href="#" val="11">Film</a>
                        <a class="dropdown-item" href="#" val="12">Music</a>
                        <a class="dropdown-item" href="#" val="13">Musicals / Theatre</a>
                        <a class="dropdown-item" href="#" val="14">Television</a>
                        <a class="dropdown-item" href="#" val="15">Video Games</a>
                        <a class="dropdown-item" href="#" val="16">Board Games</a>
                        <a class="dropdown-item" href="#" val="17">Science and Nature</a>
                        <a class="dropdown-item" href="#" val="18">Computers</a>
                        <a class="dropdown-item" href="#" val="19">Math</a>
                        <a class="dropdown-item" href="#" val="20">Mythology</a>
                        <a class="dropdown-item" href="#" val="21">Sports</a>
                        <a class="dropdown-item" href="#" val="22">Geography</a>
                        <a class="dropdown-item" href="#" val="23">History</a>
                        <a class="dropdown-item" href="#" val="24">Politics</a>
                        <a class="dropdown-item" href="#" val="25">Art</a>
                        <a class="dropdown-item" href="#" val="26">Celebrities</a>
                        <a class="dropdown-item" href="#" val="27">Animals</a>
                        <a class="dropdown-item" href="#" val="28">Vehicles</a>
                        <a class="dropdown-item" href="#" val="29">Comics</a>
                        <a class="dropdown-item" href="#" val="30">Gadgets</a>
                        <a class="dropdown-item" href="#" val="31">Anime / Manga</a>
                        <a class="dropdown-item" href="#" val="32">Cartoons</a>
                    </div>
                </div>

                <div className="form-group">
                    <h3>Difficulty:</h3>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="difficultyOptions"
                            id="difficultyLow"
                            value="Low"
                            checked={this.state.game_difficulty === 'Low'}
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
                            value="Medium"
                            checked={this.state.Game_difficulty === 'Medium'}
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
                            value="High"
                            checked={this.state.game_difficulty === 'High'}
                            onChange={this.onChangeGame_difficulty}
                        />
                        <label className="form-check-label">High</label>
                    </div>
                </div>
            </form>
        )
    }
}