import React, { Component } from 'react';
import { Container, InnerContainer } from "./containers";

import { Button, Form } from 'semantic-ui-react'

export default class Login extends Component{
    render(){
        return(
            <Container>
                <InnerContainer>
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
                </InnerContainer>
            </Container>
        )
    }
}
