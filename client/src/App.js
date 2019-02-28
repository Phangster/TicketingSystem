import React, { Component } from 'react';
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
// import route Components here
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <NavBar />
          <div className="container">
            <Switch>
              <Route path="/" exact={true} component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
