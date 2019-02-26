import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../components/Home';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

export default () => (
        <BrowserRouter>
         <Switch>
            <Route path="/" component={Home} />
            <Route path="/api/users/login" render={props => <SignIn {...props} />}/>
            <Route path="/api/users/register" component={SignUp} />
         </Switch>
        </BrowserRouter>
);