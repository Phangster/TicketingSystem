import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from '../components/Login';

Enzyme.configure({ adapter: new Adapter() });

describe('Test case for testing login',() =>{
    let wrapper;

    it('username check',()=>{
        wrapper = shallow(<Login/>);
        wrapper.find('Input[type="email"]').simulate('change', {target: {name: 'username', value: 'mynamebryanphang@gmail.com'}});
        expect(wrapper.state('username')).toEqual('mynamebryanphang@gmail.com');
    })

    it('password check',()=>{
        wrapper = shallow(<Login/>);
        wrapper.find('Input[type="password"]').simulate('change', {target: {name: 'password', value: 'bryanpassword'}});
        expect(wrapper.state('password')).toEqual('bryanpassword');
    })

    it('login check with right data',()=>{
        wrapper = shallow(<Login/>);
        wrapper.find('Input[type="email"]').simulate('change', {target: {name: 'username', value: 'mynamebryanphang@gmail.com'}});
        wrapper.find('Input[type="password"]').simulate('change', {target: {name: 'password', value: 'bryanpassword'}});
        wrapper.find('Button').simulate('click');
        // expect(wrapper.state('isLogined')).toBe(true);
    })

    it('login check with wrong data',()=>{
        wrapper = shallow(<Login/>);
        wrapper.find('Input[type="email"]').simulate('change', {target: {name: 'username', value: 'mynamebryanphang@gmail.com'}});
        wrapper.find('Input[type="password"]').simulate('change', {target: {name: 'password', value: 'krishankant1234'}});
        wrapper.find('Button').simulate('click');
        // expect(wrapper.state('isLogined')).toBe(false);
    })
})