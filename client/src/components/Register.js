import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import classnames from 'classnames';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      name:'',
      email:'',
      contact:'',
      errors: {}
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
      .then(res => console.log(res.data))
      .catch(err => this.setState({errors: err.response.data}));

  };

  render() {
    const {errors} = this.state;

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
             className={classnames('form-control form-control-lg',{
               'is-invalid':errors.name
             })} 
             onChange = {(event,newValue) => this.setState({name:newValue})}
             />
             {errors.name && (
               <div className="invalid-feedback">{errors.name}</div>
             )}
           <br/>
           <TextField
             hintText="Enter your Email"
             floatingLabelText="Email"
             className={classnames('form-control form-control-lg',{
              'is-invalid':errors.email
            })} 
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
              {errors.email && (
               <div className="invalid-feedback">{errors.email}</div>
             )}

           <br/>
           <TextField
             hintText="Enter your Contact Number"
             type="contact"
             floatingLabelText="Contact"
             className={classnames('form-control form-control-lg',{
              'is-invalid':errors.contact
            })} 
             onChange = {(event,newValue) => this.setState({contact:newValue})}
             />
              {errors.contact && (
               <div className="invalid-feedback">{errors.contact}</div>
             )}

           <br/>
           <RaisedButton label="Submit" primary={true} onClick={(event) => this.handleClick(event)}/>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
export default Register;