import React, { Component } from 'react';

import { LeftContainer } from './containers'

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
                    <h1>Dashboard</h1>
                </LeftContainer>
            </div>
        )
    }
}