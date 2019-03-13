import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from '../components/Login'

Enzyme.configure({ adapter: new Adapter() });

describe('Login', ()=>{

    it('button found', ()=>{
        const wrapper = shallow(<Login />);
        const button = wrapper.find('button');
        button.simulate('click');
    });

    // it('should be true', ()=>{
    //     const foo = true;
    //     expect(foo).toBe(true);
    // });
    // it('should be false', ()=>{
    //     const foo = true;
    //     expect(foo).toBe(false);
    // });
})