import React, { Component } from 'react';

import { LeftContainer, DashboardContainer } from "../containers";

import axios from 'axios';

export default class NewTicket extends Component{
    constructor(props){
        super(props);
        this.state={
            content:"",
            label:"API DevOps"
        };
        this.handleContent = this.handleContent.bind(this);
        this.handleLabel = this.handleLabel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleContent (e) {
        this.setState({
            content: e.target.value
        })
    }
    handleLabel (e){
        this.setState({
            label: e.target.value
        })
    }

    handleSubmit() {
        axios
        .post('/api/tickets', {
            content: this.state.content,
            label: this.state.label
        })
        .then(res => {
          console.log(res.data)
          window.location = "/user/home"
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
                <h1>Create a New Ticket</h1>
                <form className="ui form" onSubmit={this.handleSubmit}>
                <div className="field">
                    <label>Content:</label>
                    <textarea type="text" name="content" onChange={this.handleContent} />
                </div>
                <div className="field">
                    <label>Label:</label>
                    <select name="label" onChange={this.handleLabel} className="ui fluid dropdown">
                        <option value="API DevOps">API DevOps</option>
                        <option value="Chart as a Service">Chart as a Service</option>
                        <option value="Aesop">Aesop</option>
                        <option value="Travel Marketplace">Travel Marketplace</option>
                        <option value="Banking Lifestyle App">Banking Lifestyle App</option>
                        <option value="AR Car Visualizer">AR Car Visualizer</option>
                        <option value="AR Car Manual">AR Car Manual</option>
                        <option value="AR Gamification">AR Gamification</option>
                        <option value="AR Theatre">AR Theatre</option>
                        <option value="AR Menu">AR Menu</option>
                        <option value="AI Wealth Manager">AI Wealth Manager</option>
                        <option value="Multilingual Chatbot">Multilingual Chatbot</option>
                        <option value="AI Translator">AI Translator</option>
                        <option value="Digital Butler">Digital Butler</option>
                        <option value="Video Analytics">Video Analytics</option>
                        <option value="Sentiments Analysis">Sentiments Analysis</option>
                        <option value="ACNAPI MFA Login">ACNAPI MFA Login</option>
                        <option value="Ticketing Platform">Ticketing Platform</option>
                        <option value="Smart Lock">Smart Lock</option>
                        <option value="Smart Home">Smart Home</option>
                        <option value="Smart Parking">Smart Parking</option>
                        <option value="Smart Restaurant">Smart Restaurant</option>
                        <option value="Queuing System">Queuing System</option>
                        <option value="IoT Led Wall">IoT Led Wall</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <button className="ui teal button">Submit</button>
                </form>
                </DashboardContainer>
            </LeftContainer>
            </div>  
        )
    }
}