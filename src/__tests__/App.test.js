/**
 * @jest-environment jsdom
*/
import React from 'react';
// import renderer from 'react-test-renderer';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


describe("Titlebot App", () => {

  describe("Input Form", () => {
    it("checks for null input", () => {

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
      expect(wrapper.exists('div.show-progress')).toBe(true);
      wrapper.unmount();
    });
  });
});