import React from "react";
import { SideNav, Nav } from "react-sidenav";
import styled from "styled-components";

import { LeftContainer, AppContainer, Navigation } from "./containers";
// import logout from "./utils/authHelper"


import { Icon } from "react-icons-kit";
import { dashboard } from "react-icons-kit/fa/dashboard";
import { users } from "react-icons-kit/fa/users";
import { shoppingCart } from "react-icons-kit/fa/shoppingCart";
import { cubes } from "react-icons-kit/fa/cubes";
import { circleO } from "react-icons-kit/fa/circleO";

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

export default class AppNavigation extends React.Component {
  constructor(props){
    super(props);
    this.state={
      active: null,
    }
    this.onItemSelection = this.onItemSelection.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  onItemSelection = arg => {
    this.setState({ active: arg.path });
  };

  onLogout = () => {
    localStorage.clear();
  }

  render() {
      console.log(this.state.active)
    return (
      <div>
      <AppContainer>
        <Navigation>
          <SideNav
            defaultSelectedPath="1"
            theme={theme}
            onSelect ={this.onItemSelection}
          >
            <Nav id="1">
              <IconCnt>
                <Icon icon={dashboard} />
              </IconCnt>
              <Text><a href="/user/dashboard">Dashboard</a></Text>
            </Nav>
            <Nav id="2">
              <IconCnt>
                <Icon icon={users} />
              </IconCnt>
              <Text><a href="/user/tickets">Tickets</a></Text>
            </Nav>
            <Nav id="3">
              <IconCnt>
                <Icon icon={shoppingCart} />
              </IconCnt>
              <Text><a href="/user/history">History</a></Text>
            </Nav>
            <Nav id="4">
              <IconCnt>
                <Icon icon={users} />
              </IconCnt>
              <Text><a href="/user/newticket">New Ticket</a></Text>
            </Nav>
            <Nav id="5">
              <IconCnt>
                <Icon icon={circleO} />
              </IconCnt>
              <Text><a href="/user/profile">Profile</a></Text>
            </Nav>
            <Nav id="6">
              <IconCnt>
                <Icon icon={cubes} />
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
