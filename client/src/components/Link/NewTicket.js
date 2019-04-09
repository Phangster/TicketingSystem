import React, { Component } from 'react';

import { Button, Form } from 'semantic-ui-react'

import { LeftContainer, DashboardContainer } from "../containers";

export default class NewTicket extends Component{

    render(){
        return(
            <div>
            <LeftContainer>
                <DashboardContainer>
                    <div class="ui form">
                        <div class="three fields">
                            <div class="field">
                                <label>First name</label>
                                <input type="text" placeholder="First Name"/>
                            </div>
                            <div class="field">
                                <label>Middle name</label>
                                <input type="text" placeholder="Middle Name"/>
                            </div>
                            <div class="field">
                                <label>Last name</label>
                                <input type="text" placeholder="Last Name"/>
                            </div>
                        </div>
                    </div>
                </DashboardContainer>
            </LeftContainer>
            </div>  
        )
    }
}