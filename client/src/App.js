import React, { Component } from 'react';
import { AppContainer, Navigation, Body, Title } from "./components/containers";

import { Provider } from 'react-redux';
import store from './store';

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
    );
  }
}
export default App;
