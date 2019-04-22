import React, { Component } from 'react';
import axios from 'axios';
import { LeftContainer, DashboardContainer, StatusDist} from "../containers";
import { Button, Modal, TextArea, Form, TransitionablePortal, Dropdown, Input, Search } from 'semantic-ui-react';
import { exit } from 'react-icons-kit/icomoon/exit';
// import {timeSolver} from 'timeSolver';

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
            isToggleOn: true,
            currentText: '',
            comments:[]
        };
        this.handleFilterNew = this.handleFilterNew.bind(this);
        this.handleShowAll = this.handleShowAll.bind(this);
        this.handleFilterEmail = this.handleFilterEmail.bind(this);


    }

    componentDidMount(){
        const token = localStorage.getItem('jwt')
        axios.get('http://localhost:8080/api/admin/tickets', {headers: {Authorization: `${token}`}})
        .then(res=> {
            this.setState({tickets:res.data});
            console.log(this.state.tickets)
            return res.data
        })
        // axios.get('/api/auth/current', {headers: {Authorization: `${token}`}})
        // .then((res) => {
        //   this.setState({current: res.data.name})
        //   return(res.data)
        // })
    }

    handleUpdateMsg(e){
        this.setState({
            message: e.target.value
        })
        console.log(this.state.message)
    }

    handleRef = component => (this.ref = component);

    handleClose = () => {
        this.setState({ open: false })
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

    handleGetComment = (e) => {
        const token = localStorage.getItem('jwt')
        axios.get('http://localhost:8080/api/comments?content=' + this.state.content, {headers: {Authorization: `${token}`}})
            .then(res=> {
                this.setState({ comments:res.data });
                console.log(this.state.comments)
                return res.data
            })
    }

    handleAddComment = (e) =>{
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
            content: this.state.content,
            email: e.target.value
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

    handleFilterNew = (e) => {
        console.log(e.target.getAttribute('name'))
        const token = localStorage.getItem('jwt');
        const filterNew = e.target.getAttribute('name');
        axios.get('http://localhost:8080/api/admin/tickets/?status=' + filterNew, {headers: {Authorization: `${token}`}})
        .then(res=> {
            this.setState({tickets:res.data});
            console.log(res.data);
        })
    }

    handleFilterSort= (e) => {
        console.log(e.target.getAttribute('name') )
        const token = localStorage.getItem('jwt');
        const sortBy = e.target.getAttribute('name');
        this.setState({filter: e.target.name});
        axios.get('http://localhost:8080/api/admin/tickets/?status=new&sort=' + sortBy, {headers: {Authorization: `${token}`}})
        .then(res=> {
            this.setState({tickets:res.data});
            console.log(res.data);
        })
    }

    handleShowAll = () => {
        const token = localStorage.getItem('jwt')
        axios.get('http://localhost:8080/api/admin/tickets', {headers: {Authorization: `${token}`}})
        .then(res=> {
            this.setState({tickets:res.data});
            console.log(this.state.tickets)
            return res.data
        })
    }

    handleFilterEmail = (e) => {
        this.setState({currentText: e.target.value});
        console.log(e.target.value);
        const token = localStorage.getItem('jwt')
        axios.get('http://localhost:8080/api/admin/tickets?email=' + e.target.value, {headers: {Authorization: `${token}`}})
        .then(res=> {
            this.setState({tickets:res.data});
            console.log(res.data);
        })

    }

    handleSubscribe = () => {
        console.log("subcribe")
    }

    handleUnsubscribe = () => {
        console.log("unsubcribe")
    }

    //admin route need to subscribe to the ticket
    render(){
        console.log(this.state.comment)
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
                        <div>
                        <div className="search-box">
                            <form className="ui form">
                            <input type="text" placeholder="search by email..." onChange={this.handleFilterEmail} />
                            </form>
                        </div>
                        <Dropdown text='Filter' floating labeled button className='icon'>
                            <Dropdown.Menu>
                                <Dropdown.Item 
                                    onClick={this.handleShowAll} 
                                    name='all'> Show all
                                </Dropdown.Item>
                                <Dropdown.Item 
                                    onClick={this.handleFilterNew} 
                                    name='new'> New
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={this.handleFilterNew} 
                                    name='awaitUser'>AwaitUser
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={this.handleFilterNew} 
                                    name='awaitAdmin'>AwaitAdmin
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={this.handleFilterSort} 
                                    name='asc'>Accending
                                </Dropdown.Item>
                                <Dropdown.Item 
                                    onClick={this.handleFilterSort} 
                                    name='desc'>Descending
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        </div>
                        <p></p>
                        <div className="ui cards">
                        {this.state.tickets.map((p,i) => {
                            return(
                                <div className="card">
                                    <Button 
                                        color='olive' 
                                        content='Watch' 
                                        onClick={(e)=>this.handleSubscribe(e)} 
                                    />
                                    <Button 
                                        color='red' 
                                        content='Unwatch' 
                                        onClick={(e)=>this.handleUnsubscribe(e)} 
                                    />
                                    <div className="content">
                                        <div className="header">{p.label}</div>
                                        <div className="meta">Name: {p.name}</div>
                                        <div className="meta">Email: {p.email}</div>
                                        <div className="description">{p.content}</div>
                                        <div className="meta">Subscribers: {p.subscribedByName
                                        .map((subscribed,i) => {
                                            return(
                                                <div>
                                                    {subscribed}
                                                </div>
                                            )})}
                                        </div>
                                    </div>
                                    <StatusDist>
                                    <a className="ui red label">{p.status}</a>
                                    </StatusDist>
                                    <div class="meta">Date created: {p.date}</div>
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
                                            <Button type='submit' onClick={(e)=>this.handleAddComment(e)}>Submit</Button>
                                        </Form>
                                        </Modal.Content>
                                        </Modal>
                                    </TransitionablePortal>
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