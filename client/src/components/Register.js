import React, { Component } from 'react';
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';
// import axios from 'axios';
class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      email:'',
      password:''
    }
  }
  render() {
    return (
      <Container className="App">
        <h2>Register</h2>
      <Form>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input type="email" name="email" id="email" placeholder="Enter an email" />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input type="password" name="password" id="password" placeholder="Choose a password" />
      </FormGroup>
      <FormGroup>
        <Label for="number">Number</Label>
        <Input type="phoneNumber" name="phoneNumber" id="phoneNumber" placeholder="Enter phone number" />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
    </Container>
  );
}
}
export default Register;