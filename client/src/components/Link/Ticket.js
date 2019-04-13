import React, { Component } from 'react';
import axios from 'axios';

import AddComment from './AddComment';

import { LeftContainer, DashboardContainer, StatusDist } from "../containers";

export default class Ticket extends Component{
    constructor(props){
        super(props);
        this.state={
            tickets: [],
            comments: [],
            content: '',
            isModalOpen: false  
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

    handleDelete(){
        const token = localStorage.getItem('jwt')
        axios.delete('http://localhost:8080/api/tickets', {headers: {Authorization: `${token}`}})
    }

    handleContentChange(e){
        const token = localStorage.getItem('jwt')

        this.setState({
            content: e.target.value
        })

        axios.get('http://localhost:8080/api/comments?content=' + e.target.value, {headers: {Authorization: `${token}`}})
            .then(res=> {
                this.setState({ comments:res.data });
                console.log(this.state.comments)
                return res.data
            })
    }

    handleAdd= () =>{
        this.setState({ isModalOpen: true });
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
                                        <button class="ui green button" onClick={(e)=>this.handleContentChange(e)} value={p.content}>Show Comment</button>
                                        <button class="ui green button" onClick={this.handleAdd}>Add Comment</button>
                                        <AddComment isOpen={this.state.isModalOpen} />
                                        <div class="ui section divider"></div>
                                        {this.state.comments.map((p,i) => {
                                            return(
                                                <div>
                                                    <div class="description">{p.message}</div>
                                                </div>
                                            )
                                        })}
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