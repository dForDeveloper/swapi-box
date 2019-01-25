import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import * as api from '../../utils/api';

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

  describe('setActiveCategory', () => {
    it('should set state with the category name passed in', () => {
      wrapper.instance().setActiveCategory('favorites');
      expect(wrapper.state('activeCategory')).toEqual('favorites');
    });
    
    it('should set state with an array if nothing is in state', async () => {
      const mockPeople = [{ name: 'Luke Skywalker' }];
      api.cleanData = jest.fn(() => {
        return { people: mockPeople };
      });
      await wrapper.instance().setActiveCategory('people');
      expect(wrapper.state('people')).toEqual(mockPeople);
    });
  });
});