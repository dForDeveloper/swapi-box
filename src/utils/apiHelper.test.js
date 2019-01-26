import * as helper from './apiHelper';
import * as api from './api';


describe('apiHelper', () => {
  describe('getOpeningCrawl', () => {
    beforeEach(() => {
      const mockData = {
        count: 1,
        results: [{
          opening_crawl: 'A long time ago in a galaxy far, far away...'
        }]
      };
      api.fetchData = jest.fn(() => Promise.resolve(mockData));
    });
  
    it('should call fetchData with the correct parameter', async () => {
      const expected = 'https://swapi.co/api/films/';
      await helper.getOpeningCrawl();
      expect(api.fetchData).toHaveBeenCalledWith(expected);
    });
  
    it('should return a string', async () => {
      const expected = 'A long time ago in a galaxy far, far away...';
      const result = await helper.getOpeningCrawl();
      expect(result).toEqual(expected);
    });
  });
  
  describe('getHomeworld', () => {
    const mockUrl = 'https://www.website.com/';
    beforeEach(() => {
      const mockHomeworld = { name: 'Tatooine', population: '200000' };
      api.fetchData = jest.fn(() => Promise.resolve(mockHomeworld));
    });
  
    it('should call fetchData with the correct parameter', () => {
      helper.getHomeworld(mockUrl);
      expect(api.fetchData).toHaveBeenCalledWith(mockUrl);
    });
    
    it('should return an object with the correct structure', async () => {
      const expected = { homeworld: 'Tatooine', population: '200000' };
      const result = await helper.getHomeworld(mockUrl);
      expect(result).toEqual(expected);
    });
  });
  
  describe('getSpecies', () => {
    const mockUrls = ['https://www.website.com/'];
    beforeEach(() => {
      const mockSpecies = { name: 'Human' };
      api.fetchData = jest.fn(() => Promise.resolve(mockSpecies));
    });
  
    it('should call fetchData with the correct parameter', () => {
      helper.getSpecies(mockUrls);
      expect(api.fetchData).toHaveBeenCalledWith(mockUrls[0]);
    });
  
    it('should return an object when called with an empty array', async () => {
      const expected = { species: 'unknown' };
      const result = await helper.getSpecies([]);
      expect(result).toEqual(expected);
    });
    
    it('should return an object when called with a filled array', async () => {
      const expected = { species: 'Human' };
      const result = await helper.getSpecies(mockUrls);
      expect(result).toEqual(expected);
    });
  });
  
  describe('getResidents', () => {
    const mockUrls = [
      'https://www.website.com/0',
      'https://www.website.com/1',
      'https://www.website.com/2',
    ];
    beforeEach(() => {
      const mockResidents = { name: 'Luke Skywalker' };
      api.fetchData = jest.fn(() => Promise.resolve(mockResidents));
    });
  
    it('should call fetchData with the correct parameters', () => {
      helper.getResidents(mockUrls);
      expect(api.fetchData).toHaveBeenCalledWith(mockUrls[0]);
      expect(api.fetchData).toHaveBeenCalledWith(mockUrls[1]);
      expect(api.fetchData).toHaveBeenCalledWith(mockUrls[2]);
    });
  
    it('should return an object when called with an empty array', async () => {
      const expected = { residents: ['unknown'] };
      const result = await helper.getResidents([]);
      expect(result).toEqual(expected);
    });
    
    it('should return an object when called with a filled array', async () => {
      const expected = {
        residents: ['Luke Skywalker', 'Luke Skywalker', 'Luke Skywalker']
      }
      const result = await helper.getResidents(mockUrls);
      expect(result).toEqual(expected);
    });
  });
});