import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import isEmpty from '../validation/is-empty';

import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button, FormText, FormFeedback,
} from 'reactstrap';

class Login extends Component {
  constructor() {
    super();
      this.state = {
      email: '',
      password: '',
      validate: {
        emailState: '',
      },
      formFeedback: {
        message: "",
        success: "That's a tasty looking email you've got there",
        invalidEmail: "Uh oh! Looks like there is an issue with your email. Please input a correct email"
      },
      isAuthenticated: false,
      redirect: false,
      isAdmin: false,
      isInvalidLogin: null
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
    const { validate, formFeedback, isAuthenticated, isInvalidLogin } = this.state

    const userData = {
      email: this.state.email,
      password: this.state.password
    }

    console.log(userData);

    axios.post('/api/auth/login', userData)
    .then(res=>{
        // Save to localStorage
        const {token} = res.data;

        // Set token to local storage
        localStorage.setItem('jwt', token)

        // Set token to Auth header
        setAuthToken(token);

        // Decode token to get user data
        const decoded = jwt_decode(token);

        //Setting isAdmin
        this.setState({
          isAdmin: decoded.isAdmin
        })

        console.log(decoded.isAdmin)
        // this.props.history.push('/user/dashboard');
        // this.setState({
        //   redirect: true
        // })

        if(this.state.isAdmin == false ){
          window.location = "/user/home"

        }else if(this.state.isAdmin == true){
          window.location = "/admin/home"
        }
        

    })
    .catch(err => {
      if (err.status == undefined){
        console.log(err);
        this.setState({
          isInvalidLogin: true
        });
        // alert('These credentials do not match our records.');
      }
    })
  }

  componentDidMount(){
    const token = localStorage.getItem('jwt')
    console.log(token)
    if (!isEmpty(token)){
      // Bug? Doesn't seem to set it.
      this.setState({
        isAuthenticated: true,
        redirect: true
      })
      
      console.log("Redirect to dashboard")
      console.log("Authentication: " + this.state.isAuthenticated)
      // this.props.history.push('/user/dashboard');
      // console.log("isAuthenticate: " + this.state.isAuthenticated)
      
      axios.get('/api/auth/current', {headers: {Authorization: `${token}`}})
        .then((res) => {
          console.log(res)
          return(res.data)
        })
    }
    
    // console.log(this.state.isAuthenticated)
      // axios.get('/api/auth/current', token).then((err, res)=>console.log(res))
  }


  render() {
    const {errors} = this.state;
    const { email, password, formFeedback, isInvalidLogin } = this.state;
    const customCss = `
      .alert-danger{
        position: relative;
        padding: .75rem 1.25rem;
        border: 1px solid transparent;
        border-radius: .25rem;
        color: #813838;
        background-color: #fee2e1;
        border-color: #fdd6d6;
      }
    `
    return (
      <Container className="App">
        <h2>Login</h2>
        <Form className="form" onSubmit={ (e) => this.submitForm(e) }>
          <div class>
          <style>{customCss}</style>
          {
            isInvalidLogin 
            ? <p class="alert-danger">These credentials do not match our records.</p>
            : null
          }</div>

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
              <FormFeedback>
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
