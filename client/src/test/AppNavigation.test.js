import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AppNavigation from '../components/AppNavigation'

Enzyme.configure({ adapter: new Adapter() });

const id = 1;
const type = "user";
test("test user/dashboard", () => {
    const wrapper = mount(
      <MemoryRouter>
        <AppNavigation type={type} id={id}/>
      </MemoryRouter>
    );
    expect(wrapper.find('[href="/user/dashboard"]').length).toBe(1);
});