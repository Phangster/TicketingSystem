import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Col, Container, Label, Input } from 'reactstrap';
import Select from 'react-select';
import { Redirect } from 'react-router-dom'

const options = [
  { value: 'API DevOps', label: 'API DevOps' },
  { value: 'Chart as a Service', label: 'Chart as a Service' },
  { value: 'Recruitment Platform', label: 'Recruitment Platform' },
  { value: 'Aesop', label: 'Aesop' },
  { value: 'Travel Marketplace', label: 'Travel Marketplace' },
  { value: 'Banking Lifestyle App', label: 'Banking Lifestyle App' },
  { value: 'AR Car Visualizer', label: 'AR Car Visualizer' },
  { value: 'AR Car Manual', label: 'AR Car Manual' },
  { value: 'AR Gamification', label: 'AR Gamification' },
  { value: 'AR Theatre', label: 'AR Theatre' },
  { value: 'AR Menu', label: 'AR Menu' },
  { value: 'AI Wealth Manager', label: 'AI Wealth Manager' },
  { value: 'Multilingual Chatbot', label: 'Multilingual Chatbot' },
  { value: 'AI Translator', label: 'AI Translator' },
  { value: 'Digital Butler', label: 'Digital Butler' },
  { value: 'Video Analytics', label: 'Video Analytics' },
  { value: 'Sentiments Analysis', label: 'Sentiments Analysis' },
  { value: 'ACNAPI MFA Login', label: 'ACNAPI MFA Login' },
  { value: 'Ticketing Platform', label: 'VTicketing Platform' },
  { value: 'Smart Lock', label: 'VSmart Lock' },
  { value: 'Smart Home', label: 'Smart Home' },
  { value: 'Smart Parking', label: 'Smart Parking' },
  { value: 'Smart Restaurant', label: 'Smart Restaurant' },
  { value: 'Queuing System', label: 'Queuing System' },
  { value: 'IoT Led Wall', label: 'IoT Led Wall' },
  { value: 'Other', label: 'Vanilla' }
  

]

class Contact extends Component {
  constructor(props){
    super(props);
    this.state={
      name:'',
      email:'',
      contact:'',
      select:'',
      message:'',
      errors: {},
      modal: true,
      redirectToReferrer: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  
  handleClick(e){
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      contact: this.state.contact,
      select: this.state.value,
      message: this.state.inputMessage,
    };

    console.log(newUser);
    axios.post('/api/users/register', newUser)
      .then(res => console.log(res.data))
      .catch(err => this.setState({errors: err.response.data}));

    this.setState(prevState => ({
      modal: !prevState.modal,
      redirectToReferrer: true
    }));
  };

  toggle(){
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    const redirectToReferrer = this.state.redirectToReferrer;
        if (redirectToReferrer === true) {
            return <Redirect to="/Login" />
    }
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
                  <Label class="active"><span class="red-text">*</span> Your Name </Label>
                    <Input placeholder="e.g. Antony Pym" name="name" id="name" type="text" value={this.state.name} />
                  </FormGroup>
                  </Col>

                  <Col>
                  <FormGroup>
                  <Label class="active"><span class="red-text">*</span> Your Email</Label>
                    <Input placeholder="e.g. antonypym@accenture.com" name="email" id="email" type="email" value={this.state.email}/>
                  </FormGroup>
                  </Col>

                  <Col>
                  <FormGroup>
                  <Label><span class="red-text">*</span> Your Contact</Label>
                    <Input placeholder="e.g. 91234567" name="contact" id="contact" type="number" value={this.state.contact} />
                  </FormGroup>
                  </Col>

                  <Col>
                  <FormGroup>
                  <Label><span class="red-text">*</span> Select the assets or topic you are interested in</Label>
                  <Select options={options} value={this.state.value} />
                  </FormGroup>
                  </Col>

                  <Col>
                  <FormGroup>
                  <div><Label><span class="red-text">*</span> Your Message</Label></div>
                    <textarea placeholder="Please let us know which asset you are interested in trying out" name="inputMessage" id="inputMessage" value={this.state.inputMessage}/>
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
export default Contact;