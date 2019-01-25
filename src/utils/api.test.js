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
      window.fetch = jest.fn(() => {
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
      window.fetch = jest.fn(() => {
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
    
    it('should return an object with the correct structure', async () => {
      const expected = { people: ['data'] };
      const result = await api.fetchData('people');
      expect(result).toEqual(expected);
    });
  });

  describe('fetchHomeworld', () => {
    const mockUrl = 'https://www.website.com/';
    beforeEach(() => {
      const mockHomeworld = { name: 'Tatooine', population: '200000' };
      window.fetch = jest.fn(() => {
        return Promise.resolve({
          json: () => Promise.resolve(mockHomeworld)
        });
      });
    });

    it('should call fetch with the correct parameter', () => {
      api.fetchHomeworld(mockUrl);
      expect(window.fetch).toHaveBeenCalledWith(mockUrl);
    });
    
    it('should return an object with the correct structure', async () => {
      const expected = { homeworld: 'Tatooine', population: '200000' };
      const result = await api.fetchHomeworld(mockUrl);
      expect(result).toEqual(expected);
    });
  });

  describe('fetchSpecies', () => {
    const mockUrls = ['https://www.website.com/'];
    beforeEach(() => {
      const mockSpecies = { name: 'Human' };
      window.fetch = jest.fn(() => {
        return Promise.resolve({
          json: () => Promise.resolve(mockSpecies)
        });
      });
    });

    it('should call fetch with the correct parameter', () => {
      api.fetchSpecies(mockUrls);
      expect(window.fetch).toHaveBeenCalledWith(mockUrls[0]);
    });

    it('should return an object when called with an empty array', async () => {
      const expected = { species: 'unknown' };
      const result = await api.fetchSpecies([]);
      expect(result).toEqual(expected);
    });
    
    it('should return an object when called with a filled array', async () => {
      const expected = { species: 'Human' };
      const result = await api.fetchSpecies(mockUrls);
      expect(result).toEqual(expected);
    });
  });

  describe('fetchResidents', () => {
    const mockUrls = [
      'https://www.website.com/0',
      'https://www.website.com/1',
      'https://www.website.com/2',
    ];
    beforeEach(() => {
      const mockResidents = { name: 'Luke Skywalker' };
      window.fetch = jest.fn(() => {
        return Promise.resolve({
          json: () => Promise.resolve(mockResidents)
        });
      });
    });

    it('should call fetch with the correct parameters', () => {
      api.fetchResidents(mockUrls);
      expect(window.fetch).toHaveBeenCalledWith(mockUrls[0]);
      expect(window.fetch).toHaveBeenCalledWith(mockUrls[1]);
      expect(window.fetch).toHaveBeenCalledWith(mockUrls[2]);
    });

    it('should return an object when called with an empty array', async () => {
      const expected = { residents: ['unknown'] };
      const result = await api.fetchResidents([]);
      expect(result).toEqual(expected);
    });
    
    it('should return an object when called with a filled array', async () => {
      const expected = {
        residents: ['Luke Skywalker', 'Luke Skywalker', 'Luke Skywalker']
      }
      const result = await api.fetchResidents(mockUrls);
      expect(result).toEqual(expected);
    });
  });
});