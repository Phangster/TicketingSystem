import React, { Component } from 'react';

import { LeftContainer, DashboardContainer } from "../containers";

import axios from 'axios';

export default class NewTicket extends Component{
    constructor(props){
        super(props);
        this.state={
            content:"",
            label:""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    
    handleSubmit() {
        const ticketData = {
            content:this.state.content,
            label:this.state.label
        }
        axios
        .post('/api/tickets', {ticketData})
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err.response.data)
        });
    
    };

    render(){
        console.log(this.state)
        return(
            <div>
            <LeftContainer>
                <DashboardContainer>
                <form onSubmit={this.handleSubmit}>
                    <label>
                    Content:
                    <textarea type="text" name="content" onChange={this.handleChange} />
                    Label:
                    <input type="text" name="label" onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                </DashboardContainer>
            </LeftContainer>
            </div>  
        )
    }
}