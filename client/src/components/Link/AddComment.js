import React, { Component } from 'react';
import { Form, TextArea } from 'semantic-ui-react';

export default class AddComment extends Component{
    render(){
        return(
            <modal isOpen={this.props.isOpen} >
                {/* <div class="ui modal">
                <div class="header">Comment</div>
                <Form>
                    <TextArea placeholder='Tell us more' />
                    <div class="ui blue button">Submit</div>
                </Form>
                </div> */}
                <h1>hello</h1>
            </modal>
        )
    }
}