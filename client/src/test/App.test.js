import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';
import App from '../App';
import Login from '../components/Login';
import Contact from '../components/Contact';
import Ticket from '../components/Link/Ticket';
import Profile from '../components/Link/Profile';
import History from '../components/Link/History';
import NewTicket from '../components/Link/NewTicket';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'

Enzyme.configure({
    adapter: new EnzymeAdapter(),
    disableLifecycleMethods: true
});

let pathMap = {};
describe('routes using array of routers', () => {
  beforeAll(() => {
    const component = shallow(<App/>);
    pathMap = component.find(Route).reduce((pathMap, route) => {
        const routeProps = route.props();
        pathMap[routeProps.path] = routeProps.component;
        return pathMap;
      }, {});
      console.log(pathMap)
  })

  it('should show Login component for /login router', () => {
    expect(pathMap['/login']).toBe(Login);
  })

  it('should show Contact component for /contact router', () => {
    expect(pathMap['/contact']).toBe(Contact);
  })
  // it('should show user Home component for /user/home router', () => {
  //   expect(pathMap[' /user/home']).toBe(Ticket);
  // })
  // it('should show user Profile component for /user/profile router', () => {
  //   expect(pathMap['/user/profile']).toBe(Profile);
  // })
  // it('should show user History component for /user/home router', () => {
  //   expect(pathMap['/user/history']).toBe(History);
  // })
  // it('should show user NewTicket component for /user/newticket router', () => {
  //   expect(pathMap['/user/newticket']).toBe(NewTicket);
  // })

})