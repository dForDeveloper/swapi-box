import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import * as api from '../../utils/api';
import * as clean from '../../utils/dataCleaner';
import * as helper from '../../utils/apiHelper';

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  describe('componentDidMount', () => {
    it('should set state with an opening crawl', async () => {
      const expected = 'A long time ago in a galaxy far, far away...';
      helper.getOpeningCrawl = jest.fn(() => {
        return 'A long time ago in a galaxy far, far away...';
      });
      await wrapper.instance().componentDidMount();
      expect(wrapper.state('openingCrawl')).toEqual(expected);
    });

    it('should set state with an error if an error is caught', () => {
      helper.getOpeningCrawl = jest.fn(() => {
        throw Error('sorry');
      });
      wrapper.instance().componentDidMount();
      expect(wrapper.state('errorStatus')).toEqual('sorry');
    });
  });

  describe('setActiveCategory', () => {
    it('should set state with the category name passed in', () => {
      wrapper.instance().setActiveCategory('favorites');
      expect(wrapper.state('activeCategory')).toEqual('favorites');
    });
    
    it('should set state with an array if nothing is in state', async () => {
      const mockPeople = [{ name: 'Luke Skywalker' }];
      wrapper.instance().cleanData = jest.fn(() => {
        return { people: mockPeople };
      });
      await wrapper.instance().setActiveCategory('people');
      expect(wrapper.state('people')).toEqual(mockPeople);
    });

    it('should set state with an error if an error is caught', () => {
      api.fetchData = jest.fn(() => {
        throw Error('Cannot fetch');
      });
      wrapper.instance().setActiveCategory('people');
      expect(wrapper.state('errorStatus')).toEqual('Cannot fetch');
    });
  });

  describe('cleanData', () => {
    it('should call cleanPeople if people is passed in', () => {
      clean.cleanPeople = jest.fn();
      wrapper.instance().cleanData('people', 'mockData');
      expect(clean.cleanPeople).toHaveBeenCalled();
    });
    
    it('should call cleanPlanets if planets is passed in', () => {
      clean.cleanPlanets = jest.fn();
      wrapper.instance().cleanData('planets', 'mockData');
      expect(clean.cleanPlanets).toHaveBeenCalled();
    });
    
    it('should call cleanVehicles if vehicles is passed in', () => {
      clean.cleanVehicles = jest.fn();
      wrapper.instance().cleanData('vehicles', 'mockData');
      expect(clean.cleanVehicles).toHaveBeenCalled();
    });
  });
});