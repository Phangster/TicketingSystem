import React, { Component } from 'react';
import { AppContainer } from "./components/containers";

// import route Components here
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Contact from "./components/Contact";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Dashboard from "./components/Dashboard";
import AppNavigation from "./components/AppNavigation";
import Profile from "./components/Link/Profile";
import History from "./components/Link/History";
import Ticket from "./components/Link/Ticket";



class App extends Component {
  render() {
    return (
      <AppContainer>
          <Router>
            <div className="App">

            {/* Import user authentication */}

            {/* if(!user) show NavBar, if(user) show AppNavigation */}
            <NavBar />
            {/* <AppNavigation /> */}
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/contact" component={Contact} />
                <Route path="/user/dashboard" component={Dashboard} />
                <Route path="/user/profile" component={Profile} />
                <Route path="/user/tickets" component={Ticket} />
                <Route path="/user/history" component={History} />
              </Switch>
            </div>
          </Router>
      </AppContainer>
    );
  }
}
export default App;
