import * as api from './api';

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

  describe('fetchSpecies', () => {
    beforeEach(() => {
      const mockSpecies = { name: 'Human' };
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          json: () => Promise.resolve(mockSpecies)
        });
      });
    });

    it('should call fetch with the correct parameter', () => {
      const urls = ['https://www.website.com/'];
      api.fetchSpecies(urls);
      expect(window.fetch).toHaveBeenCalledWith(urls[0]);
    });
    
    it('should return a promise that resolves to an object', async () => {
      const urls = ['https://www.website.com/'];
      const expected = { species: 'Human' };
      const result = await api.fetchSpecies(urls);
      expect(result).toEqual(expected);
    });
  });

  describe('fetchResident, without fetch', () => {
    it('should return an object when called with an empty array', async () => {
      const expected = { residents: ['unknown'] };
      const result = await api.fetchResidents([]);
      expect(result).toEqual(expected);
    });
  });

  describe('fetchResidents, with fetch', () => {
    beforeEach(() => {
      const mockResidents = { name: 'Luke Skywalker' };
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          json: () => Promise.resolve(mockResidents)
        });
      });
    });

    it('should call fetch with the correct parameters', () => {
      const urls = [
        'https://www.website.com/0',
        'https://www.website.com/1',
        'https://www.website.com/2',
      ];
      api.fetchResidents(urls);
      expect(window.fetch).toHaveBeenCalledWith(urls[0]);
      expect(window.fetch).toHaveBeenCalledWith(urls[1]);
      expect(window.fetch).toHaveBeenCalledWith(urls[2]);
    });
    
    it('should return a promise that resolves to an object', async () => {
      const urls = [
        'https://www.website.com/0',
        'https://www.website.com/1',
        'https://www.website.com/2',
      ];
      const expected = {
        residents: ['Luke Skywalker', 'Luke Skywalker', 'Luke Skywalker']
      }
      const result = await api.fetchResidents(urls);
      expect(result).toEqual(expected);
    });
  });
})
