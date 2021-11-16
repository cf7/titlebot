/**
 * @jest-environment jsdom
*/
import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../App.js';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


configure({ adapter: new Adapter() });

describe("Titlebot App", () => {

  describe("Input Form", () => {
    it("changes display text upon input", () => {
      const wrapper = mount(<App />);
      wrapper.instance().handleChange = jest.fn();
      wrapper.update();
      wrapper.setProps({ displayURL: 'https://chatmeter.com' });
      wrapper.find('input.form-control').simulate('change');
      expect(wrapper.instance().handleChange).toHaveBeenCalled();
      wrapper.unmount();
    });

    it("checks for null input", () => {
      const wrapper = mount(<App />);
      wrapper.setProps({ displayURL: '' });
      wrapper.find('input.submit-btn').simulate('click');
      expect(wrapper.state('alert')).toBe(true);
      expect(wrapper.state('alertIndex')).toBe(0);
      wrapper.unmount();
    });

    // it("extracts proper urls", () => {
    //   const wrapper = mount(<App />);
    //   wrapper.setProps({ displayURL: 'asdfasdfhttps://example.comlkjlkjlkj' });
    //   wrapper.find('input.submit-btn').simulate('click');
    //   expect(wrapper.state('alert')).toBe(true);
    //   expect(wrapper.state('alertIndex')).toBe(0);
    //   wrapper.unmount();
    // });

    // it("checks for \"simple urls\"", () => {

    // });
    // it("displays retrieved title on page", () => {
    //   const wrapper = mount(<App />);
    //   wrapper.setState({ title: 'Fake Title' });
    //   expect(wrapper.state)
    //   wrapper.unmount();
    // });
  });

  describe("Submit Button", () => {
    it("submits when clicked", () => {
      const wrapper = mount(<App />);
      wrapper.instance().handleClick = jest.fn();
      wrapper.find('input.submit-btn').simulate('click');
      expect(wrapper.instance().handleClick).toHaveBeenCalled();
      wrapper.unmount();
    });
  });
});