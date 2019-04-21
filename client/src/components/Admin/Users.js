import React, { Component } from 'react';
import axios from 'axios';
import { LeftContainer, DashboardContainer } from "../containers";

export default class Users extends Component{
    constructor(props){
        super(props);
        this.state={
            users:[],
            tickets:[]
        };
    }
    componentDidMount(){
        const token = localStorage.getItem('jwt')
        axios.get('http://localhost:8080/api/admin/users', {headers: {Authorization: `${token}`}})
        .then(res=> {
            this.setState({ users:res.data });
            console.log(this.state.users)
            return res.data
        })
    }
    render(){
        return(
            <div>
                <LeftContainer>
                    <DashboardContainer>
                        <h1>Admin view All Users</h1>
                                <table class="ui celled table">
                                    <thead>
                                        <tr><th>Name</th>
                                        <th>Email</th>
                                        <th>Password</th>
                                        <th>Contact</th>
                                        <th>Ticket_Id</th>
                                        <th>Date</th>
                                        <th>Admin</th>
                                    </tr></thead>
                                    <tbody>
                                    {this.state.users.map((p,i) => {
                                        return(
                                            <tr>
                                            <td data-label="Name">{p.name}</td>
                                            <td data-label="Email">{p.email}</td>
                                            <td data-label="Password">{p.password}</td>
                                            <td data-label="Contact">{p.contact}</td>
                                            <td data-label="Ticket_Id">
                                            {/* {this.state.tickets.map((a,b)=>{
                                                <p>{a.ticketId}</p>
                                            })} */}
                                            </td>
                                            <td data-label="Date">{p.date}</td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>  
                    </DashboardContainer>
                </LeftContainer>
            </div>
        )
    }
}