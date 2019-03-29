import React, { Component } from 'react';

import { LeftContainer, DashboardContainer } from "../containers";

export default class Ticket extends Component{
    constructor(props){
        super(props);
        this.state={
            ticket: [
                {
                    title: 'API error',
                    ticNum: 1 ,
                    description: 'Problem with API calls',
                }, 
                {
                    title: 'Connection error',
                    ticNum: 2 ,
                    description: 'Problem with connection calls, return 404 always',
                },
                {
                    title: ' Build error',
                    ticNum: 3 ,
                    description: 'Problem with Buliding of application',
                }]
        }
    }
    
    render(){
        return(
            <div>
                <LeftContainer>
                    <DashboardContainer>
                        <h1>Ticket</h1>
                        <div class="ui cards">
                        {this.state.ticket.map((p,i) => {
                            return(
                                <div class="card">
                                    <div class="content">
                                        <div class="header">{p.title}</div>
                                        <div class="meta">{p.ticNum}</div>
                                        <div class="description">{p.description}</div>
                                    </div>
                                </div>
                            )   
                        })}
                        </div>
                    </DashboardContainer>
                </LeftContainer>
            </div>
        )
    }
}