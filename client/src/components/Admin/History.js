import React, { Component } from 'react';
import axios from 'axios';


export default class History extends Component{
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
                        <h1>Admin view All History</h1>
                        <div class="ui cards">
                        {this.state.tickets.map((p,i) => {
                            if(this.state.ticket.status == "done"){
                                return(
                                    <div class="card">
                                        <div class="content">
                                        <div class="meta">"Label"</div>
                                            <div class="header">{p.label}</div>
                                            <div class="meta">"Content"</div>
                                            <div class="description">{p.content}</div>
                                            <div class="meta">"Status"</div>
                                            <div class="description">{p.status}</div>
                                            <div class="meta">"Date"</div>
                                            <div class="description">{p.date}</div>
                                        </div>
                                    </div>
                                )   
                            }
                        })}
                        </div>
                    </DashboardContainer>
                </LeftContainer>
            </div>
        )
    }
}