import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import * as api from '../../utils/api';
import * as clean from '../../utils/dataCleaner';
import * as helper from '../../utils/apiHelper';

describe('App', () => {
  let wrapper;
  const mockPerson1 = {
    name: 'Luke Skywalker',
    Species: 'Human',
    Homeworld: 'some planet',
    'Population of some planet': '5 thousand',
    favorite: false,
    category: 'people'
  };
  const mockPerson2 = {
    name: 'Han Solo',
    Species: 'Human',
    Homeworld: 'some planet',
    'Population of some planet': '5 thousand',
    favorite: false,
    category: 'people'
  };
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  describe('componentDidMount', () => {
    it('should set state with an opening crawl', async () => {
      const mockFilm = {
        title: 'Star Wars',
        opening_crawl: 'A long time ago in a galaxy far, far away...',
        release_date: '1977'
      };
      helper.getFilm = jest.fn(() => mockFilm);
      await wrapper.instance().componentDidMount();
      expect(wrapper.state('film')).toEqual(mockFilm);
    });

    it('should set state with an error if an error is caught', () => {
      helper.getFilm = jest.fn(() => {
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

  describe('getCards', () => {
    it('should return an array of JSX', () => {
      wrapper.setState({ people: [mockPerson1, mockPerson2] });
      const result = wrapper.instance().getCards('people');
      expect(result.length).toEqual(2);
    })
  });

  describe('toggleFavorite', () => {
    it('should toggle the favorite property of a card and setState', () => {
      const expectedPerson = { ...mockPerson2, favorite: true };
      wrapper.setState({ people: [mockPerson1, mockPerson2] });
      wrapper.instance().toggleFavorite(mockPerson2);
      expect(wrapper.state('people')).toEqual([mockPerson1, expectedPerson]);
    });

    it('should call updateFavorites with the correct parameter', async () => {
      wrapper.instance().updateFavorites = jest.fn();
      const expected = { ...mockPerson1, favorite: true };
      await wrapper.instance().toggleFavorite(mockPerson1);
      expect(wrapper.instance().updateFavorites).toHaveBeenCalledWith(expected)
    });
  });

  describe('updateFavorites', () => {
    it('should add a card to favorites if its favorited', () => {
      const mockFavorite = { ...mockPerson1, favorite: true}
      wrapper.instance().updateFavorites(mockFavorite);
      expect(wrapper.state('favorites')).toEqual([mockFavorite]);
    });

    it('should remove a card from favorites if its not favorited', () => {
      const mockFavorite = { ...mockPerson1, favorite: true}
      wrapper.instance().updateFavorites(mockFavorite);
      wrapper.instance().updateFavorites(mockPerson1);
      expect(wrapper.state('favorites').length).toEqual(0);
    });
  });
});