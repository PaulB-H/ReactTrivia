import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import StartPage from "./components/start-page";
import JoinPage from "./components/join-page";
import Create_Game from "./components/create_game";

class App extends Component {
  render() {
    return (
      <Router>
          <Route exact path="/" component={StartPage} />
          <Route exact path="/join" component={JoinPage} />
          <Route exact path="/create" component={Create_Game} />
      </Router>
    );
  }
}

export default App;