import React from 'react';
import { Route, Switch } from 'react-router-dom'
import App from './App';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';


const Routes = () => (
    <App>
        <Switch>
            <Route path="/" component={Home} />
            <Route path="/api/users/login" component={Login} />
            <Route path="/api/users/register" render={props => <Register {...props} />}/>
        </Switch>
    </App>   
)

export default Routes