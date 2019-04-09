import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';

export default class EditPage extends Component{
    constructor(props){
        super(props);
        this.state={
            users:[]
        };
    }

    render(){
        return(
            <div>
                <LeftContainer>
                <DashboardContainer>
                        <h1>Login</h1>
                        <Form>
                        <Form.Field>
                        <label>Email</label>
                            <input placeholder='Email' />
                        </Form.Field>
                        <Form.Field>
                        <label>Password</label>
                        <input placeholder='Password' />
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                        </Form>
                        <br></br>
                        <div>
                            <h4 style="text-align: center">No account? <a href="/register">Register here</a> </h4>
                        </div>
                </DashboardContainer>
            </LeftContainer>
            </div>
        )
    }
}