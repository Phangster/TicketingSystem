import React from 'react';
import { shallow } from 'enzyme';
import Contact from '../components/Contact';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({
    adapter: new EnzymeAdapter(),
    disableLifecycleMethods: true
});


describe('Testing cases for new ticket created', () => {

    let wrapper;

    it('Name check',()=>{
        wrapper = shallow(<Contact/>);
        wrapper.find('Input[type="text"]').simulate('change', {target: {name: 'name', value: 'bryan phang'}});
        expect(wrapper.state('name')).toEqual('bryan phang');
    })

    it('Email check',()=>{
        wrapper = shallow(<Contact/>);
        wrapper.find('Input[type="email"]').simulate('change', {target: {name: 'email', value: 'mynamebryanphang@gmail.com'}});
        expect(wrapper.state('email')).toEqual('mynamebryanphang@gmail.com');
    })

    it('Contact check',()=>{
        wrapper = shallow(<Contact/>);
        wrapper.find('Input[type="number"]').simulate('change', {target: {name: 'contact', value: 98028394}});
        expect(wrapper.state('contact')).toEqual(98028394);
    })

    it('Message check',()=>{
        const component = shallow(<Contact/>)
        const wrapper = component.find('textarea');
        expect(wrapper.length).toBe(1);
    })

    it('registering check with right data',()=>{
        wrapper = shallow(<Contact/>);
        wrapper.find('Input[type="text"]').simulate('change', {target: {name: 'name', value: 'bryan phang'}});
        expect(wrapper.length).toBe(1);
        wrapper.find('Input[type="email"]').simulate('change', {target: {name: 'email', value: 'mynamebryanphang@gmail.com'}});
        expect(wrapper.length).toBe(1);
        wrapper.find('Input[type="number"]').simulate('change', {target: {name: 'contact', value: '91023945'}});
        expect(wrapper.length).toBe(1);
        wrapper.find('textarea').simulate('change', {target: {name: 'inputMessage', value: 'hello world how do you do my friend'}});
        expect(wrapper.state('inputMessage')).toBe('hello world how do you do my friend');;
        wrapper.find('Button').simulate('click');
        
    })

})