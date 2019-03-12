import React from 'react';
import { create } from 'react-test-renderer';
import Contact from '../components/Contact';

test("snapshot", ()=>{
    const c = create(<Contact/>)
    expect(c.toJSON).toMatchSnapshot();
})