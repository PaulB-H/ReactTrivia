import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class MainPage extends Component {

    constructor(props) {
        super(props);

        
    }



    render() {
        return (
            <div style={{marginTop: 10}}>
                <div className="form-group">
                    <button className="btn btn-primary" onClick=""> <Link to="/host" className="nav-link">Create Game</Link> </button>
                    <button className="btn btn-primary" onClick=""> <Link to="/join" className="nav-link">Join Game</Link></button>
                </div>
            </div>
        )
    }
}