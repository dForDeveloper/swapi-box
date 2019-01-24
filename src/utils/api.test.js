import * as api from './api';
import { shallow } from 'enzyme';

describe('api', () => {
  
  describe('fetchOpeningCrawl', () => {
    beforeEach(() => {
      const mockFilms = {
        count: 1,
        results: [{ opening_crawl: 'in a galaxy far, far away...' }]
      };
      window.fetch = jest.fn().mockImplementation(() => {
          return Promise.resolve({
            json: () => Promise.resolve(mockFilms)
          });
        });
    });

    it('should call fetch with the correct params', async () => {
      const expected = 'https://swapi.co/api/films/';
      await api.fetchOpeningCrawl();
      expect(window.fetch).toHaveBeenCalledWith(expected);
    });

    it('should return a Promise that resolves to a string', async () => {
      const expected = 'in a galaxy far, far away...';
      const result = await api.fetchOpeningCrawl();
      expect(result).toEqual(expected);
    });
  });
})
