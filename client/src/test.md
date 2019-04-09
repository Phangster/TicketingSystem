import React from 'react';
import { shallow } from 'enzyme';
import Contact from '../components/Contact';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({
    adapter: new EnzymeAdapter(),
    disableLifecycleMethods: true
});

const setUp = (props={})=>{
    const component = shallow(<Contact {...props}/>);
    return component;
}

const findByTestAtrr= (component, attr)=>{
    const wrapper = component.find(`[data-test='${attr}']`);
    return wrapper
};

describe('Contact Component', () => {

    let component;
    beforeEach(()=> {
        component = setUp();
    })

    it('Should render Contact page without errors', () => {
        const wrapper = findByTestAtrr(component, 'contact');
        expect(wrapper.length).toBe(1);
    });

    it('Should render Contact page without errors', () => {
        const wrapper = findByTestAtrr(component, 'contact');
        expect(wrapper.length).toBe(1);
    });

})