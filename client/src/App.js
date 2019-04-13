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
import AppNavigation from "./components/AppNavigation";
import Profile from "./components/Link/Profile";
import History from "./components/Link/History";
import Ticket from "./components/Link/Ticket";
import NewTicket from "./components/Link/NewTicket";
import setAuthToken from "./utils/setAuthToken"
import isEmpty from "./validation/is-empty"
import AddComment from './components/Link/AddComment';



class App extends Component {

  constructor(props){
    super(props);
    this.state={
      loggedIn: false,
    }
  }

  componentDidMount(){
    const token = localStorage.getItem('jwt')

    if (token){
      this.setState({
        loggedIn: true
      })
      console.log("Login status: " + this.state.loggedIn)
      console.log("Hi Bryan")
      setAuthToken(token);

    }else{
      this.setState({
        loggedIn: false
      })
      // window.location = "/"
      console.log("Hi Chloe")
    }

    console.log("JWT in localstorage(?): " + localStorage.getItem('jwt'))

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
                  <Route path="/user/home" component={Ticket} />
                  <Route path="/user/profile" component={Profile} />
                  <Route path="/user/history" component={History} />
                  <Route path="/user/newticket" component={NewTicket} />
                  <Route path="/user/addcomment" component={AddComment} />
                </Switch>
              </div>
            </Router>
        </AppContainer>
      );
    }
  }
}
export default App;
