import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';

export default class Home extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  
  render() {
    console.log(this.state.activeItem)
    const { activeItem } = this.state
    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item 
            header as={NavLink} exact to="/" name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Item 
            header as={NavLink} exact to="/about"
            name='about'
            active={activeItem === 'about'}
            onClick={this.handleItemClick}
          />
          <Menu.Item 
            header as={NavLink} exact to="/contact"
            name='contact us'
            active={activeItem === 'contact us'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position='right'>
            <Menu.Item
                header as={NavLink} exact to="/login"
                name='login'
                active={activeItem === 'login'}
                onClick={this.handleItemClick}
                Redirect='/login'
            />
            <Menu.Item
                header as={NavLink} exact to="/register"
                name='register'
                active={activeItem === 'register'}
                onClick={this.handleItemClick}
            />
          </Menu.Menu>

        </Menu>
      </div>
    )
  }
}
