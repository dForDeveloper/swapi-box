import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import * as api from '../../utils/api';
import * as clean from '../../utils/dataCleaner';

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  describe('componentDidMount', () => {
    it('should set state with an opening crawl', async () => {
      const expected = 'A long time ago in a galaxy far, far away...';
      api.fetchOpeningCrawl = jest.fn(() => {
        return 'A long time ago in a galaxy far, far away...';
      });
      await wrapper.instance().componentDidMount();
      expect(wrapper.state('openingCrawl')).toEqual(expected);
    });
  });

  describe('setActiveCategory, without fetch', () => {
    it('should set state with the category name passed in', () => {
      wrapper.instance().setActiveCategory('favorites');
      expect(wrapper.state('activeCategory')).toEqual('favorites');
    });
  });
  
  describe('setActiveCategory, with fetch', () => {
    it('should set state of with an array', async () => {
      const mockPeople = [{ name: 'Luke Skywalker' }];
      clean.cleanData = jest.fn(() => {
        return { people: mockPeople };
      });
      await wrapper.instance().setActiveCategory('people');
      expect(wrapper.state('people')).toEqual(mockPeople);
    });
  });
});