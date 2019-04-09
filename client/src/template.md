import React, { Component } from 'react';
import axios from 'axios';

export default class Users extends Component{
    constructor(props){
        super(props);
        this.state={
            users:[]
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
        return(
            <div></div>
        )
    }
}