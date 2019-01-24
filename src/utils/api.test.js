import * as api from './api';
import { shallow } from 'enzyme';

describe('api', () => {
  describe('fetchOpeningCrawl', () => {
    beforeEach(() => {
      const mockData = {
        count: 1,
        results: [{
          opening_crawl: 'A long time ago in a galaxy far, far away...'
        }]
      };
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          json: () => Promise.resolve(mockData)
        });
      });
    });

    it('should call fetch with the correct parameter', async () => {
      const expected = 'https://swapi.co/api/films/';
      await api.fetchOpeningCrawl();
      expect(window.fetch).toHaveBeenCalledWith(expected);
    });

    it('should return a Promise that resolves to a string', async () => {
      const expected = 'A long time ago in a galaxy far, far away...';
      const result = await api.fetchOpeningCrawl();
      expect(result).toEqual(expected);
    });
  });

  describe('fetchData', () => {
    beforeEach(() => {
      const mockData = { results: ['data'] };
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          json: () => Promise.resolve(mockData)
        });
      });
    });

    it('should call fetch with the correct parameter', () => {
      const expected = 'https://swapi.co/api/people/'
      api.fetchData('people');
      expect(window.fetch).toHaveBeenCalledWith(expected);
    });
    
    it('should return a promise that resolves to an object', async () => {
      const expected = { people: ['data'] };
      const result = await api.fetchData('people');
      expect(result).toEqual(expected);
    });
  });

  describe('fetchHomeworld', () => {
    beforeEach(() => {
      const mockHomeworld = { name: 'Tatooine', population: '200000' };
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          json: () => Promise.resolve(mockHomeworld)
        });
      });
    });

    it('should call fetch with the correct parameter', () => {
      const url = 'https://www.website.com/';
      api.fetchHomeworld(url);
      expect(window.fetch).toHaveBeenCalledWith(url);
    });
    
    it('should return a promise that resolves to an object', async () => {
      const url = 'https://www.website.com/';
      const expected = { homeworld: 'Tatooine', population: '200000' };
      const result = await api.fetchHomeworld(url);
      expect(result).toEqual(expected);
    });
  });
})
