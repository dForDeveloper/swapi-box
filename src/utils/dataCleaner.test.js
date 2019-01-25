import * as clean from './dataCleaner';
import * as api from './api';

describe('cleanPeople', () => {
  const mockPeople = {
      people: [
      { name: 'Luke Skywalker', homeworld: 'Planet 1' , species: 'Species 1' },
      { name: 'Han Solo', homeworld: 'Planet 2' , species: 'Species 2' }
    ]
  };
  api.fetchHomeworld = jest.fn(() => {
    return ({
      homeworld: 'some planet',
      population: 'a lot'
    });
  });
  api.fetchSpecies = jest.fn(() => {
    return { species: 'Human' };
  });
  beforeEach(() => {
  });
  
  it('should call fetchHomeworld with the correct parameters', () => {
    clean.cleanPeople(mockPeople);
    expect(api.fetchHomeworld).toHaveBeenCalledWith('Planet 1');
    expect(api.fetchHomeworld).toHaveBeenCalledWith('Planet 2');
  });
  
  it('should call fetchSpecies with the correct parameters', () => {
    clean.cleanPeople(mockPeople);
    expect(api.fetchSpecies).toHaveBeenCalledWith('Species 1');
    expect(api.fetchSpecies).toHaveBeenCalledWith('Species 2');
  });
  
  it('should return an object', async () => {
    const expected = {
      people: [
        {
          name: 'Luke Skywalker',
          species: 'Human',
          homeworld: 'some planet',
          population: 'a lot'
        },
        {
          name: 'Han Solo',
          species: 'Human',
          homeworld: 'some planet',
          population: 'a lot'
        }
      ]
    };
    const result = await clean.cleanPeople(mockPeople);
    expect(result).toEqual(expected);
  });
});