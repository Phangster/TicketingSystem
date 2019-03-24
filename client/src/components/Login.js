import React, { Component } from 'react';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import isEmpty from '../validation/is-empty'

import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button, FormText, FormFeedback,
} from 'reactstrap';

class Login extends Component {
  constructor() {
    super();
      this.state = {
      'email': '',
      'password': '',
      validate: {
        emailState: '',
      },
      formFeedback: {
        message: "",
        success: "That's a tasty looking email you've got there",
        invalidEmail: "Uh oh! Looks like there is an issue with your email. Please input a correct email"
      },
      isAuthenticated: false
    }
    this.handleChange = this.handleChange.bind(this);
  }

  validateEmail(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate, formFeedback } = this.state
      if (emailRex.test(e.target.value)) {
        validate.emailState = 'has-success'
        formFeedback.message = formFeedback.success
      } else {
        validate.emailState = 'has-danger'
        formFeedback.message = formFeedback.invalidEmail
      }
      this.setState({ validate })
    }

  handleChange = async (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [ name ]: value,
    });
  }

  submitForm(e) {
    e.preventDefault();
    const { validate, formFeedback, isAuthenticated } = this.state

    const userData = {
      email: this.state.email,
      password: this.state.password
    }

    console.log(userData);
    
    // this.props.loginUser(userData);
    // this.props.
    axios.post('/api/users/login', userData)
    .then(res=>{
        // Save to localStorage
        const {token} = res.data;

        // Set token to local storage
        localStorage.setItem('jwtToken', token)

        // Set token to Auth header
        setAuthToken(token);

        // Decode token to get user data
        const payload = jwt_decode(token);

        console.log(payload)

        isAuthenticated = true
        // Set current user
        // dispatch(setCurrentUser(decoded));

    })

    console.log(`Email: ${ this.state.email }`)
  }

  // componentWillReceiveProps(nextProps){
  //   if (nextProps.auth.isAuthenticated){
  //     // Redirected to localhost:3000/dashboard
  //     this.props.history.push('/dashboard');
  //   }
  // }

  render() {
    const {errors} = this.state;
    const { email, password, formFeedback } = this.state;
    return (
      <Container className="App">
        <h2>Sign In</h2>
        <Form className="form" onSubmit={ (e) => this.submitForm(e) }>
          <Col>
            <FormGroup>
              <Label>Username</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="myemail@email.com"
                value={ email }
                // className={classnames('form-control form-control-lg',{
                //   'is-invalid':errors.email
                // })}
                valid={ this.state.validate.emailState === 'has-success' }
                invalid={ this.state.validate.emailState === 'has-danger' }
                onChange={ (e) => {
                            this.validateEmail(e)
                            this.handleChange(e)
                          } }
              />
              <FormFeedback valid>
                {formFeedback.message}
              </FormFeedback>
              <FormFeedback invalid>
                {formFeedback.message}
              </FormFeedback>
              <FormText>Your username is most likely your email.</FormText>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                // className={classnames('form-control form-control-lg',{
                //   'is-invalid':errors.password
                // })}              
                type="password"
                name="password"
                id="examplePassword"
                placeholder="********"
                value={ password }
                onChange={ (e) => this.handleChange(e) }
            />
            </FormGroup>
          </Col>
          <Button>Submit</Button>
          <button>hello</button>
      </Form>
      </Container>
    );
  }
}

export default Login;

// Login.propTypes = {
//   loginUser: PropTypes.func.isRequired,
//   password: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth,
//   errors: state.errors
// });

// export default connect(mapStateToProps, { loginUser })(Login);
