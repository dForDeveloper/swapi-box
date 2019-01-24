import * as api from './api';
import { shallow } from 'enzyme';

describe('fetchOpeningCrawl', () => {
  it('should call fetch with the correct params', async () => {
    const mockFilms = {
      count: 1,
      results: [{ opening_crawl: 'in a galaxy far, far away...' }]
    };
    const expected = 'https://swapi.co/api/films/';
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockFilms)
      });
    });
    await api.fetchOpeningCrawl();
    expect(window.fetch).toHaveBeenCalledWith(expected);
  });
});
