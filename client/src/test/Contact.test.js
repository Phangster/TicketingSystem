import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Contact from '../components/Contact'

Enzyme.configure({ adapter: new Adapter() });