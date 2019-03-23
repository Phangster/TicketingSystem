jest.dontMock('../App');

import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router';

import App from './App';


test('invalid path should redirect to 404', () => {
    const wrapper = shallow(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <App/>
        </MemoryRouter>
    );
    it('renders a static text', () => {
        expect(
            wrapper.contains(<div>Home</div>)
        ).toBe(true);
    });
});