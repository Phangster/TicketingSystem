import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Col, Container, Label, Input } from 'reactstrap';
// import { Dropdown } from 'semantic-ui-react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../actions/authActions';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import {
   FormText, FormFeedback,
} from 'reactstrap';

// const options = [
//   { value: 'API DevOps', label: 'API DevOps' },
//   { value: 'Chart as a Service', label: 'Chart as a Service' },
//   { value: 'Recruitment Platform', label: 'Recruitment Platform' },
//   { value: 'Aesop', label: 'Aesop' },
//   { value: 'Travel Marketplace', label: 'Travel Marketplace' },
//   { value: 'Banking Lifestyle App', label: 'Banking Lifestyle App' },
//   { value: 'AR Car Visualizer', label: 'AR Car Visualizer' },
//   { value: 'AR Car Manual', label: 'AR Car Manual' },
//   { value: 'AR Gamification', label: 'AR Gamification' },
//   { value: 'AR Theatre', label: 'AR Theatre' },
//   { value: 'AR Menu', label: 'AR Menu' },
//   { value: 'AI Wealth Manager', label: 'AI Wealth Manager' },
//   { value: 'Multilingual Chatbot', label: 'Multilingual Chatbot' },
//   { value: 'AI Translator', label: 'AI Translator' },
//   { value: 'Digital Butler', label: 'Digital Butler' },
//   { value: 'Video Analytics', label: 'Video Analytics' },
//   { value: 'Sentiments Analysis', label: 'Sentiments Analysis' },
//   { value: 'ACNAPI MFA Login', label: 'ACNAPI MFA Login' },
//   { value: 'Ticketing Platform', label: 'VTicketing Platform' },
//   { value: 'Smart Lock', label: 'VSmart Lock' },
//   { value: 'Smart Home', label: 'Smart Home' },
//   { value: 'Smart Parking', label: 'Smart Parking' },
//   { value: 'Smart Restaurant', label: 'Smart Restaurant' },
//   { value: 'Queuing System', label: 'Queuing System' },
//   { value: 'IoT Led Wall', label: 'IoT Led Wall' },
//   { value: 'Other', label: 'Vanilla' }

// ]

class Contact extends Component {
  constructor(props){
    super(props);
    this.state={
      name:'',
      email:'',
      contact:'',
      selectedOption:'',
      inputMessage:'',
      errors: {},
      validate: {
        emailState:'',
        nameState:'',
        contactState:'',
        messageState:''
      },
      modal: true,
      redirectToReferrer: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validateName = this.validateName.bind(this);
    this.validateContact = this.validateContact.bind(this);
    this.validateMessage = this.validateMessage.bind(this);

  }

  handleChange = async (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [ name ]: value,
    });
  }

  validateEmail(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state;
      if (emailRex.test(e.target.value)) {
        validate.emailState = 'has-success'
      } else {
        validate.emailState = 'has-danger'
      }
      this.setState({ validate });
    }

  validateName(e) {
    const nameRegex = /^[a-zA-Z ]{2,30}$/;
    const { validate } = this.state;
      if (nameRegex.test(e.target.value)) {
        validate.nameState = 'has-success'
      } else {
        validate.nameState = 'has-danger'
      }
      this.setState({ validate });
    }

  validateContact(e){
    const contactRegex = /^[689]\d{7}$/;
    const { validate } = this.state; 
    if (contactRegex.test(e.target.value)) {
      validate.contactState = 'has-success'
    } else {
      validate.contactState = 'has-danger'
    }
    this.setState({ validate });
  }

  validateMessage(e){
    const messageRegex = /^.{15,300}$/
    const { validate } = this.state; 
    if (messageRegex.test(e.target.value)) {
      validate.messageState = 'has-success'
    } else {
      validate.messageState = 'has-danger'
    }
    this.setState({ validate });

  }
  


  handleClick(e){
    console.log(this.state.validate.messageState)

    if (this.state.validate.emailState === 'has-success' && 
      this.state.validate.nameState === 'has-success' && 
      this.state.validate.contactState === 'has-success'&&
      this.state.validate.messageState === 'has-success'){

      const newUser = {
        name: this.state.name,
        email: this.state.email,
        contact: this.state.contact,
        tickets:{
          label: this.state.options,
          content: this.state.inputMessage
        }
      };

      this.setState({
        selectedOption: e.target.value
      })  

      console.log(newUser);

      // Refer to client/src/actions/authActions.js to see the redirected route.
      this.props.registerUser(newUser, this.props.history);
    
    };
  };

  toggle(){
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
  }

  render() {
    const {errors} = this.state; // equivalent to const errors = this.state.errors;
    // const redirectToReferrer = this.state.redirectToReferrer;
    //     if (redirectToReferrer === true) {
    //         return <Redirect to="/Login" />
    // }
    return (
      <div>
        <Modal isOpen={this.state.modal}>
          <Container>
          <ModalHeader toggle={this.toggle}>
              <h4>Contact Us</h4>
            </ModalHeader>
            <ModalBody>
              <form name="contactForm">
                  <Col>
                  <FormGroup>
                  <Label className="active"><span className="red-text">*</span> Your Name </Label>
                    <Input 
                      placeholder="e.g. Antony Pym" 
                      className={classnames('form-control form-control-lg',{
                        'is-invalid':errors.name
                      })}
                      name="name" 
                      id="name" 
                      type="text"
                      value={this.state.name} 
                      valid={ this.state.validate.nameState === 'has-success' }
                      invalid={ this.state.validate.nameState === 'has-danger' }      
                      onChange={ (e) => {
                                  this.validateName(e)
                                  this.handleChange(e) }}
                      />
                  <FormFeedback valid>
                    Hello {this.state.name}! :)
                  </FormFeedback>
                  <FormFeedback>
                    I don't know how to read your name. How do I address you?
                  </FormFeedback>
                  <FormText>Input your name</FormText>

                  </FormGroup>
                  </Col>

                  <Col>
                  <FormGroup>
                  <Label className="active"><span className="red-text">*</span> Your Email</Label>
                    <Input 
                      placeholder="e.g. antonypym@accenture.com" 
                      className={classnames('form-control form-control-lg',{
                        'is-invalid':errors.email
                      })}
                      name="email" 
                      id="email" 
                      type="email"       
                      valid={ this.state.validate.emailState === 'has-success' }
                      invalid={ this.state.validate.emailState === 'has-danger' }      
                      value={this.state.email} 
                      onChange={ (e) => {
                                  this.validateEmail(e)
                                  this.handleChange(e)
                                  }} />
                  <FormFeedback valid>
                    That's a tasty looking email you've got there.
                  </FormFeedback>
                  <FormFeedback>
                    Uh oh! Looks like there is an issue with your email. Please input a correct email.
                  </FormFeedback>
                  <FormText>Your username is most likely your email.</FormText>

                  </FormGroup>
                  </Col>

                  <Col>
                  <FormGroup>
                  <Label><span className="red-text">*</span> Your Contact</Label>
                    <Input 
                      placeholder="e.g. 91234567" 
                      className={classnames('form-control form-control-lg',{
                        'is-invalid':errors.contact
                      })}
                      valid={ this.state.validate.contactState === 'has-success' }
                      invalid={ this.state.validate.contactState === 'has-danger' }
                      name="contact" 
                      id="contact" 
                      type="number" 
                      value={this.state.contact} 
                      onChange={ (e) => {
                                  this.validateContact(e)
                                  this.handleChange(e)
                                  }} />
                    <FormFeedback valid>
                      Cool number!
                    </FormFeedback>
                    <FormFeedback>
                      Please input a correct contact number.
                    </FormFeedback>
                    <FormText>We need your contact number to follow-up on urgent requests</FormText>
                  </FormGroup>
                  </Col>

                  <Col>
                  <FormGroup>
                  <Label><span className="red-text">*</span> Select the assets or topic you are interested in</Label>
                  {/* <Dropdown placeholder='eg Smart Home' fluid selection options={options} onChange={ (e) => this.handleChange(e)}/> */}
                  <select value={this.state.value} 
                    onChange={ (e) => this.handleChange(e)} 
                    name="options" 
                    id="options">
                      <option value="API DevOps">API DevOps</option>
                      <option value="Chart as a Service">Chart as a Service</option>
                    < option value="Recruitment Platform">Recruitment Platform</option>
                  </select>
                  </FormGroup>
                  </Col>

                  <Col>
                  <FormGroup>
                  <div><Label><span className="red-text">*</span> Your Message</Label></div>
                    <textarea className="form-control"
                      placeholder="Please let us know which asset you are interested in trying out" 
                      // className={classnames('form-control form-control-lg',{
                      //   'is-invalid':errors.inputMessage
                      // })}
                      valid={ this.state.validate.messageState === 'has-success' }
                      invalid={ this.state.validate.messageState === 'has-danger' }
                      name="inputMessage" 
                      id="inputMessage" 
                      value={this.state.inputMessage} 
                      onChange={ (e) => {
                                    this.validateMessage(e)
                                    this.handleChange(e)
                                    }} />
                    <FormFeedback valid>
                      We will get back to you as soon as possible, {this.state.name}.
                    </FormFeedback>
                    <FormFeedback>
                      Please describe your problem with minimum 10 characters to 300 characters.
                    </FormFeedback>
                    <FormText>Please elaborate so we could better serve you quickly</FormText>

                  </FormGroup>
                  </Col>
              </form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={(event) => this.handleClick(event)}>Submit</Button>
            </ModalFooter>
          </Container>
        </Modal>
      </div>
    );
  }
}

Contact.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {registerUser}) (withRouter(Contact));