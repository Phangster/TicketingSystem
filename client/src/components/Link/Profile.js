import React, { Component } from 'react';

import { LeftContainer, DashboardContainer } from "../containers";

export default class Profile extends Component{

    render(){
        return(
            <LeftContainer>
                <DashboardContainer>
                    <h1>Profile</h1>
                </DashboardContainer>
            </LeftContainer>
        )
    }
}