import React, { Component } from 'react';
import axios from 'axios';


export default class History extends Component{
    constructor(props){
        super(props);
        this.state={
            history:[]
        };
    }
    componentDidMount(){
        const token = localStorage.getItem('jwt')
        axios.get('http://localhost:8080/api/tickets/read', {headers: {Authorization: `${token}`}})
        .then(res=> {
            this.setState({ history:res.data });
            console.log(this.state.history)
            return res.data
        })
    }
    render(){
        return(
            <div></div>
        )
    }
}