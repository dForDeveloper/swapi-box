import { fetchData } from './api';

describe('api', () => {
  describe('fetchData', () => {
    const mockUrl = 'https://www.website.com/';
    const mockData = { results: ['data'] };
    beforeEach(() => {
      window.fetch = jest.fn(() => {
        return Promise.resolve({
          json: () => Promise.resolve(mockData),
          ok: true
        });
      });
    });

    it('should call fetch with the correct parameter', () => {
      fetchData(mockUrl);
      expect(window.fetch).toHaveBeenCalledWith(mockUrl);
    });
    
    it('should return an object with the correct structure', async () => {
      const result = await fetchData(mockUrl);
      expect(result).toEqual(mockData);
    });

    it('should throw an error if response is not ok', () => {
      const mockUrl = 'https://swapi.co/api/'
      window.fetch = jest.fn(() => {
        return Promise.resolve({
          ok: false,
          status: 404
        });
      });
      const expected = Error(`Error fetching data from ${mockUrl}. 404`);
      expect(fetchData(mockUrl)).rejects.toEqual(expected);
    });
  });
});