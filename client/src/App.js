import React, { Component } from 'react';
import Contact from "./components/Contact";
import Login from "./components/Login";
import Home from "./components/Home";
// import NavBar from "./components/NavBar";

// import route Components here
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Contact from "./components/Contact";
import Login from "./components/Login";
import Home from "./components/Home";

import { AppNavigation } from "./components/AppNavigation";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Switch>
              <Route path="/" exact={true} component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/contact" component={Contact} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
