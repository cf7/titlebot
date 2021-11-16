/**
 * @jest-environment jsdom
*/
import React from 'react';
import 'regenerator-runtime/runtime';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../App.js';


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

    it("extracts proper urls if they exist", () => {
      const wrapper = shallow(<App />);
      expect(wrapper.instance().processURL('asdfasdfhttps://example.comlkjlkjlkj', ['.com'])).toBe('https://example.com');
      wrapper.unmount();
    });

    it("returns null when suffixes are missing", () => {
      const wrapper = shallow(<App />);
      expect(wrapper.instance().processURL('asdfasdfhttps://examplelkjlkjlkj', ['.com'])).toBe('');
      wrapper.unmount();
    });
  });

  describe("Submit Button", () => {
    it("submits when clicked", () => {
      const wrapper = mount(<App />);
      wrapper.instance().handleClick = jest.fn();
      wrapper.update();
      wrapper.setProps({ displayURL: 'https://chatmeter.com' }); // for some reason requires this
      wrapper.find('input.submit-btn').simulate('click');
      expect(wrapper.instance().handleClick).toHaveBeenCalled();
      wrapper.unmount();
    });
  });
});