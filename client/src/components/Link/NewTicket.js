import React, { Component } from 'react';

import { LeftContainer, DashboardContainer } from "../containers";

export default class NewTicket extends Component{

    render(){
        return(
            <LeftContainer>
                <DashboardContainer>
                    <h1>NewTicket</h1>
                </DashboardContainer>
            </LeftContainer>
        )
    }
}