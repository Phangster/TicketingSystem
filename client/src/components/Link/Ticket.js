import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal, TextArea, TransitionablePortal, Form} from 'semantic-ui-react';


import { LeftContainer, DashboardContainer, StatusDist } from "../containers";

export default class Ticket extends Component{
    constructor(props){
        super(props);
        this.state={
            tickets: [],
            comments: [],
            content: '',
            message: '',
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

    handleOpen = (e) => {
        this.setState({ 
            open: true,
            content: e.target.value
        })
        const token = localStorage.getItem('jwt')

        axios.get('http://localhost:8080/api/comments?content=' + e.target.value, {headers: {Authorization: `${token}`}})
            .then(res=> {
                this.setState({ comments:res.data });
                console.log(this.state.comments)
                return res.data
            })
    }

    handleClose = () => {
        this.setState({ open: false })
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
                                    {/* <div>
                                        <i class="x icon" onClick={this.handleDelete}></i>
                                    </div> */}
                                    <p></p>
                                        <div class="header">{p.label}</div>
                                        <div class="meta">{i}</div>
                                        <div class="description">{p.content}</div>
                                    </div>
                                    {/* <StatusDist>
                                    {button}
                                    </StatusDist> */}
                                    <div style={{textAlign: "center"}}>
                                        <Button 
                                            color='olive' 
                                            content='Add Comment' 
                                            onClick={(e)=>this.handleOpen(e)} 
                                            value={p.content} 
                                        />
                                    <TransitionablePortal
                                        open={this.state.open}
                                        onOpen={() => setTimeout(() => document.body.classList.add('modal-fade-in'), 0)}
                                        transition={{ animation: 'scale', duration: 500 }}>
                                        <Modal
                                        open={true}
                                        onClose={(event) => {
                                            document.body.classList.remove('modal-fade-in')
                                            this.handleClose()
                                        }}
                                        closeIcon
                                        >
                                        <Modal.Header>
                                            Comments
                                        </Modal.Header>
                                        <Modal.Content>
                                        <table class="ui padded table">
                                            <thead>
                                                <tr>
                                                    <th>Comments</th>
                                                    <th>Name</th>
                                                    <th>Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.comments.map((p,i) => {
                                                return(
                                                    <tr>
                                                    <td data-label="Comments">{p.message}</td>
                                                    <td data-label="Name">{p.name}</td>
                                                    <td data-label="Date">{p.date}</td>
                                                    </tr>
                                                )
                                            })}
                                            </tbody>
                                        </table>  
                                        <Form>
                                            <Form.Field>
                                            <label>Comment</label>
                                            <TextArea placeholder='Write your comment here ....' ref={this.handleRef} onChange={this.handleUpdateMsg.bind(this)} />
                                            </Form.Field>
                                            <Button type='submit' onClick={(e)=>this.handleAdd(e)}>Submit</Button>
                                        </Form>
                                        </Modal.Content>
                                        </Modal>
                                    </TransitionablePortal>
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