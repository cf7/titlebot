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


describe("Titlebot App", () => {

  describe("Input Form", () => {
    it("changes display text upon input", () => {
      const handleChangeMock = jest.fn();
      const wrapper = mount(<App />);
      wrapper.setProp({ displayURL: 'https://chatmeter.com' });
      wrapper.find('input.form-control').simulate('change');
      expect(wrapper.prop('displayURL'))
      wrapper.unmount();
    });

    it("checks for null input", () => {
      const wrapper = mount(<App />);

      wrapper.unmount();
    });

    it("checks for proper urls", () => {

    });

    it("checks for \"simple urls\"", () => {

    });
  });

  describe("Submit Button", () => {
    it("responds when clicked", () => {
      const wrapper = mount(<App />);
      wrapper.find('input.submit-btn').simulate('click');
      expect().toBe(true);
      wrapper.unmount();
    });
  });
});