import React, { Component } from 'react';
import axios from 'axios';
import { LeftContainer, DashboardContainer, StatusDist} from "../containers";
import { Button, Modal, TextArea, Header, Image, Grid, Divider, Form,
    TransitionablePortal } from 'semantic-ui-react';

//TODO - change ticket status and update database from processing to done, automatically it will be push to history
export default class Tickets extends Component{
    constructor(props){
        super(props);
        this.state={
            tickets:[],
            isModalOpen: false,
            content:[],
            message:'',
            current:'',
            open: false,
            isToggleOn: true
        };
    }

    handleRef = component => (this.ref = component);
    open = () => this.setState({ open: true}, () => this.ref.focus());
    close = () => this.setState({ open: false });

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    componentDidMount(){
        const token = localStorage.getItem('jwt')
        axios.get('http://localhost:8080/api/admin/tickets', {headers: {Authorization: `${token}`}})
        .then(res=> {
            this.setState({tickets:res.data});
            console.log(this.state.tickets)
            return res.data
        })
        axios.get('/api/auth/current', {headers: {Authorization: `${token}`}})
        .then((res) => {
          this.setState({current: res.data.name})
          return(res.data)
        })
    }

    handleUpdateMsg(e){
        this.setState({
            message: e.target.value
        })
        console.log(this.state.message)
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

    handleAdd = (e) =>{
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
        window.location = "/admin/home";
        console.log(e.target)
        console.log(this.state.message)
    }

    handleSubscribe = (e) => {
        console.log(e.target.value)
        this.setState(function(prevState) {
			return {isToggleOn: !prevState.isToggleOn};
		});
        const token = localStorage.getItem('jwt');
        console.log("this.state.current: " + this.state.current)
        console.log("e.target.value: " + e.target.value)
        console.log("this.state.content: " + this.state.content)
        const subscriber = {
            subscribedBy: this.state.current,
            subscribedTo: e.target.value
        }
        axios.post('http://localhost:8080/api/admin/subscribe', subscriber, {
            headers: {
                'Authorization': token
            }
        })
        .then(res=> {
            console.log(res);
            console.log(res.data);
        })
    }
    //admin route need to subscribe to the ticket

    render(){
        const { open } = this.state
        return(
            <div>
                <style>{`
                    .ui.dimmer {
                    transition: background-color 0.5s ease;
                    background-color: transparent;
                    }

                    .modal-fade-in .ui.dimmer {
                    background-color: teal;
                    }
                `}</style>
                <LeftContainer>
                    <DashboardContainer>
                        <h1>Admin view All Tickets</h1>
                        <div class="ui cards">
                        {this.state.tickets.map((p,i) => {
                            return(
                                <div className="card">
                                    <button onClick={(e)=>this.handleSubscribe(e)} value={p.name}>
                                        {this.state.isToggleOn ? 'Subscribe' : 'UnSubscribe'}
                                    </button>
                                    <div className="content">
                                        <div className="header">{p.label}</div>
                                        <div className="meta">Name: {p.name}</div>
                                        <div className="meta">Email: {p.email}</div>
                                        <div className="description">{p.content}</div>
                                        <div className="meta">Subscribers: {p.subscribedBy
                                        .map((subscribed,i) => {
                                            return(
                                                <div>
                                                    <p>{subscribed}</p>
                                                </div>
                                            )})}
                                        </div>
                                    </div>
                                    <StatusDist>
                                    <a className="ui red label">{p.status}</a>
                                    </StatusDist>
                                    {/* <button class="ui green button" onClick={(e)=>this.handleContentChange(e)} value={p.content}>Show Comment</button> */}
                                    <Button color='olive' content='Add Comment' onClick={this.handleOpen} value={p.content} />
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
                                        <Form>
                                            <Form.Field>
                                            <label>Comment</label>
                                            <TextArea placeholder='Write your comment here ....' />
                                            </Form.Field>
                                            <Button type='submit'>Submit</Button>
                                        </Form>
                                        </Modal.Content>
                                        </Modal>
                                    </TransitionablePortal>

                                    {/* <Button primary content='Add Comment' onClick={this.open} />
                                        <Modal open={this.state.open} onClose={this.close}>
                                        <Modal.Content>
                                            <TextArea placeholder='Tell us more' ref={this.handleRef} onChange={this.handleUpdateMsg.bind(this)} />
                                            <button class="ui green button" onClick={(e)=>this.handleAdd(e)}>Submit</button>
                                        </Modal.Content>
                                        </Modal> */}
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