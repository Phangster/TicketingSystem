import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal, TextArea} from 'semantic-ui-react';


import { LeftContainer, DashboardContainer, StatusDist } from "../containers";

export default class Ticket extends Component{
    constructor(props){
        super(props);
        this.state={
            tickets: [],
            comments: [],
            content: '',
            message: '',
            isModalOpen: false,
            open: false
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

    handleRef = component => (this.ref = component);
    open = () => this.setState({ open: true}, () => this.ref.focus());
    close = () => this.setState({ open: false });

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

   handleUpdateMsg(e){
       this.setState({
           message: e.target.value
       })
       console.log(this.state.message)
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

    handleAdd= (e) =>{
        this.setState({ isModalOpen: true });
        const token = localStorage.getItem('jwt');
        const ticket_info = {
            message: this.state.message,
            content: this.state.content,
            userId: token.userId
        }
        axios.post('http://localhost:8080/api/comments', ticket_info, {
            headers: {
                'Authorization': token
            }
        })
        .then(res=> {
            console.log(res);
            console.log(res.data);
        })
        window.location = "/user/home";
        console.log(e.target)
    }

    handleEdit(){
        console.log("editing")
        //redirect to an edit page form for submission
    }
    render(){
        console.log(this.state.isModalOpen)
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
                                        <Button primary content='Add Comment' onClick={this.open} />
                                        <Modal open={this.state.open} onClose={this.close}>
                                        <Modal.Content>
                                            <TextArea placeholder='Tell us more' ref={this.handleRef} onChange={this.handleUpdateMsg.bind(this)} />
                                            <button class="ui green button" onClick={(e)=>this.handleAdd(e)}>Submit</button>
                                        </Modal.Content>
                                        </Modal>
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