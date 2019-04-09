import React, { Component } from 'react';

import { LeftContainer } from './containers';
import { Ticket } from './Link/Ticket';

export default class Dashboard extends Component{

    constructor(props){
        let data = JSON.parse(localStorage.getItem('data'));
        super(props)
        this.state = {
            data: data,
        }
    }

    render(){
        console.log(this.state.data)
        return(
            <div>
                <LeftContainer>
                    <Ticket />
                </LeftContainer>
            </div>
        )
    }
}