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
      wrapper.setProp({ displayURL: 'https://chatmeter.com' });
      wrapper.find('input.form-control').simulate('change');
      expect(wrapper.instance().handleChange).toHaveBeenCalled();
      wrapper.unmount();
    });

    // it("checks for null input", () => {
    //   const wrapper = mount(<App />);

    //   wrapper.unmount();
    // });

    // it("checks for proper urls", () => {

    // });

    // it("checks for \"simple urls\"", () => {

    // });
  });

  // describe("Submit Button", () => {
  //   it("responds when clicked", () => {
  //     // const wrapper = mount(<App />);
  //     // wrapper.find('input.submit-btn').simulate('click');
  //     // expect().toBe(true);
  //     // wrapper.unmount();
  //   });
  // });
});