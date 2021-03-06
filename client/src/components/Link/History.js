import React, { Component } from 'react';
import axios from 'axios';

import { LeftContainer, DashboardContainer } from "../containers";

export default class Ticket extends Component{
    constructor(props){
        super(props);
        this.state={
            tickets: []
        };
    }
// TODO - filter tickets by status done in tickets
    componentDidMount(){
        const token = localStorage.getItem('jwt')
        axios.get('http://localhost:8080/api/tickets', {headers: {Authorization: `${token}`}})
            .then(res=> {
                this.setState({ tickets:res.data });
                console.log(this.state.tickets)
                return res.data
            })

    }

    render(){
        return(
            <div>
                <LeftContainer>
                    <DashboardContainer>
                        <h1>Ticket</h1>
                        <div class="ui cards">
                        {this.state.tickets.done.map((p,i) => {
                            return(
                                <div class="card">
                                    <div class="content">
                                        <div class="header">{p.label}</div>
                                        <div class="meta">{i}</div>
                                        <div class="description">{p.content}</div>
                                    </div>
                                    <a class="ui red label">Done</a>
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