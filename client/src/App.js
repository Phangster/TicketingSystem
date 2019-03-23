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
import { AppNavigation } from "./components/AppNavigation";

class App extends Component {
  render() {
    return (
<<<<<<< HEAD
      <AppContainer>
        <AppNavigation />
        <Provider store={store}>
          <Router>
            <div className="App">
                <Switch>
                  <Route path="/login" component={Login} />
                  <Route path="/contact" component={Contact} />
                </Switch>
              </div>
          </Router>
        </Provider>
      </AppContainer>
=======
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
>>>>>>> 004381e3a9476212333d326dec0711bf77418c88
    );
  }
}
export default App;
