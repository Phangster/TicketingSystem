import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div class="ui container">
        <br></br>
        <div class="ui secondary menu">
          <div class="header item">Brand</div>
          <a class="active item">
            Home
          </a>
          <a class="item">
            Messages
          </a>
          <a class="item">
            Friends
          </a>
          <div class="right menu">
            <div class="item">
              <div class="ui icon input">
                <input type="text" placeholder="Search..." />
                <i class="search link icon"></i>
              </div>
            </div>
            <a class="ui item">
              Logout
            </a>
          </div>
        </div>
        <div class="ui divider"></div>
        <br></br>
        <div class="ui grid">
          <div class="four wide column">
            <div class="ui secondary vertical pointing fluid menu">
              <a class="item">
                Home
              </a>
              <a class="item">
                Messages
              </a>
              <a class="item active">
                Friends
              </a>
            </div>
          </div>
          <div class="twelve wide column">
            <div class="ui form">
              <div class="field">
                <input type="text" name="first-name" placeholder="First name" />
              </div>
              <div class="field">
                <textarea placeholder="Some example text..."></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;