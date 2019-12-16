import React, { Component } from 'react';
import socketIOclient from "socket.io-client";
import axios from 'axios';


const socket = socketIOclient("localHost:8080")


// { value: '9', label: 'General' },
// { value: '10', label: 'Books' },
// { value: '11', label: 'Film' },
// { value: '12', label: 'Music' },
// { value: '13', label: 'Musicals / Theatre' },
// { value: '14', label: 'Television' },
// { value: '15', label: 'Video Games' },
// { value: '16', label: 'Board Games' },
// { value: '17', label: 'Science / Nature' },
// { value: '18', label: 'Computers' },
// { value: '19', label: 'Math' },
// { value: '20', label: 'Mythology' },
// { value: '21', label: 'Sports' },
// { value: '22', label: 'Geography' },
// { value: '23', label: 'History' },
// { value: '24', label: 'Politics' },
// { value: '25', label: 'Art' },
// { value: '26', label: 'Celebrities' },
// { value: '27', label: 'Animals' },
// { value: '28', label: 'Vehicles' },
// { value: '29', label: 'Comics' },
// { value: '30', label: 'Gadgets' },
// { value: '31', label: 'Anime / Manga' },
// { value: '32', label: 'Cartoons' },




export default class Create_Game extends Component {

    constructor(props) {
        super(props);

        this.onChangeGame_question_amount = this.onChangeGame_question_amount.bind(this);
        this.onChangeGame_category = this.onChangeGame_category.bind(this);
        this.onChangeGame_difficulty = this.onChangeGame_difficulty.bind(this);
        this.onChangeGame_type = this.onChangeGame_type.bind(this);

        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            roomID: '',
            game_question_amount: '',
            game_category: '',
            game_difficulty: '',
            game_type: ''
        }
    }

    // componentDidMount() {
    //     axios.get(`https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple`)
    //         .then(res => {
    //             console.log(res);
    //         });
    // }

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

    onChangeGame_type(e) {
        this.setState({
            game_type: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        axios.get(`https://opentdb.com/api.php?amount=${this.state.game_question_amount}&category=${this.state.game_category}&difficulty=${this.state.game_difficulty}&type=${this.state.game_type}`)
        .then(res => {
            console.log(res);
        });

        console.log(`Form Submitted:`);
        console.log(`Question Amount: ${this.state.game_question_amount}`);
        console.log(`Category: ${this.state.game_category}`);
        console.log(`Difficulty: ${this.state.game_difficulty}`);
        console.log(`Type: ${this.state.game_type}`);

        // this.setState({
        //     game_question_amount: '',
        //     todo_responsible: '',
        //     todo_priority: '',
        //     todo_completed: false
        // })
    }

    render() {
        return (
            <div style={{ maxWidth: "600px", display: "flex", justifyContent: "center" }}>

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

                    <div className="form-group">
                        <h3>Category:</h3>
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
                        <h3>Type:</h3>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="typeOptions"
                                id="difficultyLow"
                                value="Low"
                                checked={this.state.game_type === ''}
                                onChange={this.onChangeGame_type}
                            />
                            <label className="form-check-label">Both</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="typeOptions"
                                id="difficultyMedium"
                                value="multiple"
                                checked={this.state.game_type === 'multiple'}
                                onChange={this.onChangeGame_type}
                            />
                            <label className="form-check-label">Multiple Choice</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="typeOptions"
                                id="difficultyHigh"
                                value="boolean"
                                checked={this.state.game_type === 'boolean'}
                                onChange={this.onChangeGame_type}
                            />
                            <label className="form-check-label">True or False</label>
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
                                checked={this.state.game_difficulty === 'Medium'}
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
                    <div className="form-group">
                        <input type="submit" value="Create Game" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}