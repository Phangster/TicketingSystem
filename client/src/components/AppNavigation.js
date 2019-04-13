import React from "react";
import { SideNav, Nav } from "react-sidenav";
import styled from "styled-components";

import { AppContainer, Navigation } from "./containers";
import { Redirect } from "react-router-dom";

import { Icon } from "react-icons-kit";
import { home } from 'react-icons-kit/icomoon/home';
import { history } from 'react-icons-kit/icomoon/history';
import { ticket } from 'react-icons-kit/icomoon/ticket';
import { profile } from 'react-icons-kit/icomoon/profile';
import { exit } from 'react-icons-kit/icomoon/exit';
import { users } from 'react-icons-kit/icomoon/users'

const IconCnt = styled.div`
  color: #6a56a5;
  display: flex;
  justify-content: center;
  aligh-items: center;
`;

const theme = {
  selectionColor: "#FFF",
  hoverBgColor: "#181b20"
};

const Text = styled.div`
  padding-left: 8px;
`;

// TODO - axios call and update the status to check if admin is true
export default class AppNavigation extends React.Component {
  constructor(props){
    super(props);
    this.state={
      active: null,
      redirect: false,
      admin: false
    }
    this.onItemSelection = this.onItemSelection.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  onItemSelection = arg => {
    this.setState({ active: arg.path });
  };

  onLogout = () => {
    localStorage.clear();
    console.log('logout')
    window.location = "/";
  }

  render() {
      console.log(this.state.active)
      if (this.state.redirect === true) {
        return <Redirect to='/'/>;
      }else{
        if ( this.state.admin === false ){
          return (
            <div>
            <AppContainer>
              <Navigation>
                <SideNav
                  defaultSelectedPath="1"
                  theme={theme}
                  onSelect ={this.onItemSelection}>
                  <Nav id="1">
                    <IconCnt>
                      <Icon icon={home} />
                    </IconCnt>
                    <Text><a href="/user/home">Home</a></Text>
                  </Nav>
                  <Nav id="2">
                    <IconCnt>
                      <Icon icon={history} />
                    </IconCnt>
                    <Text><a href="/user/history">History</a></Text>
                  </Nav>
                  <Nav id="3">
                    <IconCnt>
                      <Icon icon={ticket} />
                    </IconCnt>
                    <Text><a href="/user/newticket">New Ticket</a></Text>
                  </Nav>
                  <Nav id="4">
                    <IconCnt>
                      <Icon icon={profile} />
                    </IconCnt>
                    <Text><a href="/user/profile">Profile</a></Text>
                  </Nav>
                  <Nav id="5">
                    <IconCnt>
                      <Icon icon={exit} />
                    </IconCnt>
                    <Text><a onClick = {this.onLogout} >Logout</a></Text>
                  </Nav>
                </SideNav>
              </Navigation>
            </AppContainer>
            </div>
          );
        }else{
          return (
            <div>
            <AppContainer>
              <Navigation>
                <SideNav
                  defaultSelectedPath="1"
                  theme={theme}
                  onSelect ={this.onItemSelection}>
                  <Nav id="1">
                    <IconCnt>
                      <Icon icon={home} />
                    </IconCnt>
                    <Text><a href="/user/home">Home</a></Text>
                  </Nav>
                  <Nav id="2">
                    <IconCnt>
                      <Icon icon={history} />
                    </IconCnt>
                    <Text><a href="/user/history">History</a></Text>
                  </Nav>
                  <Nav id="3">
                    <IconCnt>
                      <Icon icon={users} />
                    </IconCnt>
                    <Text><a href="/user/profile">Users</a></Text>
                  </Nav>
                  <Nav id="4">
                    <IconCnt>
                      <Icon icon={exit} />
                    </IconCnt>
                    <Text><a onClick = {this.onLogout} >Logout</a></Text>
                  </Nav>
                </SideNav>
              </Navigation>
            </AppContainer>
            </div>
          );
        }
      }
  }
}
