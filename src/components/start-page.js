import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class MainPage extends Component {

    constructor(props) {
        super(props);

        
    }



    render() {
        return (
            <div className="d-flex align-items-center justify-content-center" style={{backgroundColor: "orange", height: "100vh", width: "100vw", color: "white", flexDirection: "column"}}>
                <h1 style={{fontSize: "50px"}}>CreaTRIVIty</h1>
                <div style={{height: "20vh"}}></div>
                <div>
                <Link to="/create"><button type="button" className="btn btn-primary" style={{width: "200px", height: "50px", display: "block"}}>Create Game</button></Link>
                <Link to="/join"><button className="btn btn-primary mt-2" style={{width: "200px", height: "50px", display: "block"}}>Join Game</button></Link>
                <div style={{height: "20vh"}}></div>

                </div>
            </div>
        )
    }
}