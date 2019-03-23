import React, { Component } from 'react';
import { AppContainer, Navigation, Body, Title } from "./components/containers";

import { Provider } from 'react-redux';

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
      <AppContainer>
          <Router>
            <div className="App">
                <Switch>
                  <Route path="/" component={Home} />
                  <Route path="/login" component={Login} />
                  <Route path="/contact" component={Contact} />
                </Switch>
              </div>
          </Router>
      </AppContainer>
      // <Router>
      //   <div className="App">
      //   <NavBar />
      //     <div className="container">
      //       <Switch>
      //         <Route path="/" exact={true} component={Home} />
      //         <Route path="/login" component={Login} />
      //         <Route path="/contact" component={Contact} />
      //       </Switch>
      //     </div>
      //   </div>
      // </Router>
    );
  }
}
export default App;
