import React, { Component } from 'react';
import axios from 'axios';
import { LeftContainer, DashboardContainer, StatusDist } from "../containers";

//TODO - change ticket status and update database from processing to done, automatically it will be push to history
export default class Tickets extends Component{
    constructor(props){
        super(props);
        this.state={
            tickets:[]
        };
    }
    componentDidMount(){
        const token = localStorage.getItem('jwt')
        axios.get('http://localhost:8080/api/admin/tickets', {headers: {Authorization: `${token}`}})
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
                        <h1>Admin view All Tickets</h1>
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