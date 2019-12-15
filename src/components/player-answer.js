import React, { Component } from 'react';
import socketIOClient from "socket.io-client";

const socket = socketIOClient("localhost:8080");


export default class MainPage extends Component {

    constructor(props) {
        super(props);

        this.submitAnswer = this.submitAnswer.bind(this);

        this.state = {
            answer: '',
            color: '',
            result: '',
        }
    }

    submitAnswer(e) {
        this.setState({
            answer: e.currentTarget.textContent,
            color: e.currentTarget.className
        });
        socket.emit('submit answer', this.state.answer)
        socket.on('receive results', (msg) =>{
            this.setState({
                result: msg
            })
        });
    }

    
    render() {
        return (
            <div className="d-flex justify-content-center" style={{height: "100vh"}}>
                {(this.state.answer === '')
                ?
                <div style={{height: "100vh"}}> 
                    <div className="row">
                        <button className="btn btn-primary" style={{width: "50vw", height: "50vh"}} onClick={this.submitAnswer}>A</button>
                        <button className="btn btn-success" style={{width: "50vw", height: "50vh"}}>B</button>
                    </div>
                    <div className="row">
                        <button className="btn btn-danger" style={{width: "50vw", height: "50vh"}}>C</button>
                        <button className="btn btn-warning" style={{width: "50vw", height: "50vh"}}>D</button>
                    </div>
                </div>
                :
                    this.state.result === ''
                    ?
                    <div className='d-flex justify-content-center align-items-center' className={this.state.color} style={{height: "100vh", width: "100vw"}}>
                        <p>Answer {this.state.answer}</p>
                    </div>
                    :
                    <div className='d-flex justify-content-center align-items-center' className={this.state.color} style={{height: "100vh", width: "100vw"}}>
                        <p>Answer {this.state.answer}</p>
                    </div>
                }
            </div>
        )
    }
}