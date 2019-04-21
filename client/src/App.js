import React, { Component } from 'react';
import { AppContainer, NavContainer } from "./components/containers";
import axios from 'axios';

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
import TicketAdmin from './components/Admin/Tickets';
import UserAdmin from './components/Admin/Users';
import HistoryAdmin from './components/Admin/History';




class App extends Component {

  constructor(props){
    super(props);
    this.state={
      loggedIn: false,
      isAdmin: false
    }
  }
  

  componentDidMount(){
    const token = localStorage.getItem('jwt')
  
    axios.get('http://localhost:8080/api/auth/current', {headers: {Authorization: `${token}`}})
    .then(res=> {
        console.log("This is the data " + res.data.isAdmin)
        this.setState({ isAdmin: res.data.isAdmin})
    })

    if (token){
      this.setState({
        loggedIn: true
      })

      if(token.isAdmin == true){
        this.setState({
          isAdmin: true
        })
      }else{
        this.setState({
          isAdmin: false
        })
      }
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

    // console.log("JWT in localstorage(?): " + localStorage.getItem('jwt'))

  }

  render() {
    if(this.state.loggedIn == false){
      return (
        <NavContainer>
            <Router>
              <div className="App">
                <NavBar />
                <Switch>
                  <Route path="/login" component={Login} />
                  <Route path="/contact" component={Contact} />
                </Switch>
              </div>
            </Router>
        </NavContainer>
      )
    }else if (this.state.loggedIn == true && this.state.isAdmin == true){
      return (
        <AppContainer>
            <Router>
              <div className="App">
                <AppNavigation />
                <Switch>
                  <Route path="/admin/home" component={TicketAdmin} />
                  <Route path="/admin/history" component={HistoryAdmin} />
                  <Route path="/admin/profile" component={UserAdmin} />
                </Switch>
              </div>
            </Router>
        </AppContainer>
      );
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
