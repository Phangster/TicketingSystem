import React, { Component } from 'react';
import {HomeContainer} from './containers';
import { Button } from 'semantic-ui-react';

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state={};
    }
    handleContact = () =>{
        window.location = "/contact";
    }
    handleUser = () => {
        window.location = "/login";
    }

    render(){
        return(
            <div>
                <HomeContainer>
                    <h1>Welcome to Accenture's Tracker</h1>
                    <h3>A all in one webapp that allows you to track your problems and follow ups all with one platform</h3>
                    <p></p>
                    <div>
                        <Button onClick={(e)=>this.handleContact(e)}>Having a problem?</Button>
                        <Button onClick={(e)=>this.handleUser(e)}>Already a user?</Button>
                    </div> 
                </HomeContainer>
            </div>
        )
    }
}