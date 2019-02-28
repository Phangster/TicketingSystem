import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      name:'',
      email:'',
      contact:'',
    }
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(e){
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      contact: this.state.contact,
    };

    console.log(newUser);
    axios.post('/api/users/register', newUser)
      .then(res => console.log(res.data)
      .catch(err => err.response.data));
  };

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Register"
           />
           <TextField
             hintText="Enter your Name"
             floatingLabelText="Name"
             onChange = {(event,newValue) => this.setState({name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Contact Number"
             type="contact"
             floatingLabelText="Contact"
             onChange = {(event,newValue) => this.setState({contact:newValue})}
             />
           <br/>
           <RaisedButton label="Submit" primary={true} onClick={(event) => this.handleClick(event)}/>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
export default Register;