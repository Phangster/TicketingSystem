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

})