import React, { Component } from 'react';
import Header from './Header';
import SideBar from './SideBar';

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <SideBar />
      </div>
    );
  }
}

export default Home;