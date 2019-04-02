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
import NewTicket from "./components/Link/NewTicket";

import isEmpty from "./validation/is-empty"



class App extends Component {

  constructor(props){
    super(props);
    this.state={
      loggedIn: false,
    }
  }

  componentDidMount(){
    const token = localStorage.getItem('jwt')

    if (!isEmpty(token)){
      this.setState({
        loggedIn: true
      })
    }else{
      this.setState({
        loggedIn: false
      })
    }

  }

  render() {
    if(this.state.loggedIn == false){
      return (
        <AppContainer>
            <Router>
              <div className="App">
                <NavBar />
                <Switch>
                  <Route path="/login" component={Login} />
                  <Route path="/contact" component={Contact} />
                  <Route path="/user/dashboard" component={Dashboard} />
                  <Route path="/user/profile" component={Profile} />
                  <Route path="/user/tickets" component={Ticket} />
                  <Route path="/user/history" component={History} />
                  <Route path="/user/newticket" component={NewTicket} />
                </Switch>
              </div>
            </Router>
        </AppContainer>
      )
    }else{
      return (
        <AppContainer>
            <Router>
              <div className="App">
                <AppNavigation />
                <Switch>
                  <Route path="/login" component={Login} />
                  <Route path="/contact" component={Contact} />
                  <Route path="/user/dashboard" component={Dashboard} />
                  <Route path="/user/profile" component={Profile} />
                  <Route path="/user/tickets" component={Ticket} />
                  <Route path="/user/history" component={History} />
                  <Route path="/user/newticket" component={NewTicket} />
                </Switch>
              </div>
            </Router>
        </AppContainer>
      );
    }
  }
}
export default App;
