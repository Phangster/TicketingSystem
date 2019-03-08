import React, { Component } from 'react';
import Contact from "./components/Contact";
import Login from "./components/Login";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import { Provider } from 'react-redux';
import store from './store';

// import route Components here
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
          <NavBar />
            <div className="container">
              <Switch>
                <Route path="/" exact={true} component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/contact" component={Contact} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
