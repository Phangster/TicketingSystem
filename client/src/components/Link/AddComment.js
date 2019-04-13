import React, { Component } from 'react';
import { Form, TextArea } from 'semantic-ui-react';

export default class AddComment extends Component{
    render(){
        return(
            <div isOpen={this.props.isOpen} class="ui modal">
            <div class="header">Comment</div>
            <Form>
                <TextArea placeholder='Tell us more' />
                <div class="ui blue button">Submit</div>
            </Form>
            </div>
        )
    }
}