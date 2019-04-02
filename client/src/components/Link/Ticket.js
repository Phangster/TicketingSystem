import React, { Component } from 'react';
import axios from 'axios';

import { LeftContainer, DashboardContainer, StatusDist } from "../containers";

export default class Ticket extends Component{
    constructor(props){
        super(props);
        this.state={
            tickets: []
        };
    }

    componentDidMount(){
        const token = localStorage.getItem('jwt')
        axios.get('http://localhost:8080/api/tickets/read', {headers: {Authorization: `${token}`}})
            .then(res=> {
                this.setState({ tickets:res.data });
                console.log(this.state.tickets)
                return res.data
            })
    }
    
    render(){
        let button;
        if (this.state.status == "new"){
            button = <a class="ui green label">New</a>
        }else{
            button = <a class="ui blue label">Processsing</a>
        }
        return(
            <div>
                <LeftContainer>
                    <DashboardContainer>
                        <h1>Ticket</h1>
                        <div class="ui cards">
                        {this.state.tickets.map((p,i) => {
                            return(
                                <div class="card">
                                    <div class="content">
                                        <div class="header">{p.label}</div>
                                        <div class="meta">{i}</div>
                                        <div class="description">{p.content}</div>
                                    </div>
                                    <StatusDist>
                                    {button}
                                    </StatusDist>
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