import React, { Component } from 'react';
import axios from 'axios';

import { LeftContainer, DashboardContainer, StatusDist } from "../containers";

export default class Ticket extends Component{
    constructor(props){
        super(props);
        this.state={
            tickets: [],
            comments: []
        };
    }

    componentDidMount(){
        const token = localStorage.getItem('jwt')
        
        axios.get('http://localhost:8080/api/tickets', {headers: {Authorization: `${token}`}})
            .then(res=> {
                this.setState({ tickets:res.data });
                console.log(this.state.tickets)
                return res.data
            })

        axios.get('http://localhost:8080/api/comments', {headers: {Authorization: `${token}`}})
        .then(res=> {
            this.setState({ comments:res.data });
            console.log(this.state.comments)
            return res.data
        })
    }

    //Delete function for deleting the ticket on the user side
    handleDelete(){
        // const token = localStorage.getItem('jwt')
        // axios.get('http://localhost:8080/api/delete', {headers: {Authorization: `${token}`}})
        //     .then(res=> {
        //         this.setState({ tickets:res.data });
        //         console.log(this.state.tickets)
        //         return res.data
        //     })
        console.log("delete successful")

    }

    handleDone(){
        const token = localStorage.getItem('jwt')
        axios.post('http://localhost:8080/api/tickets', {headers: {Authorization: `${token}`}}, {status: "done"})

    }

    handleEdit(){
        console.log("editing")
        //redirect to an edit page form for submission
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
                                    <div>
                                        <i class="x icon" onClick={this.handleDelete}></i>
                                    </div>
                                    <p></p>
                                        <div class="header">{p.label}</div>
                                        <div class="meta">{i}</div>
                                        <div class="description">{p.content}</div>
                                    </div>
                                    <StatusDist>
                                    {button}
                                    </StatusDist>
                                    <div>
                                        <button class="ui yellow button" onClick={this.handleEdit}>Edit</button>
                                        <button class="ui olive button" onClick={this.handleDone}>Done</button>
                                        <select class="ui dropdown">
                                            <option value="">Comment</option>
                                            {this.state.comments.map((p,i) => {
                                                return(<option value={i}>{}</option>)
                                            })}
                                        </select>
                                        {/* <button class="ui blue button" onClick={this.handleComment}>Comment</button> */}
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