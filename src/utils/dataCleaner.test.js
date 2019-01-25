import * as clean from './dataCleaner';
import * as api from './api';

describe('dataCleaner', () => {
  describe('cleanPeople', () => {
    const mockPeople = {
        people: [
        {
          name: 'Luke Skywalker',
          homeworld: 'Planet 1',
          species: 'Species 1'
        },
        {
          name: 'Han Solo',
          homeworld: 'Planet 2',
          species: 'Species 2'
        }
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
    
    it('should call fetchHomeworld with the correct parameter', () => {
      clean.cleanPeople(mockPeople);
      expect(api.fetchHomeworld).toHaveBeenCalledWith('Planet 1');
      expect(api.fetchHomeworld).toHaveBeenCalledWith('Planet 2');
    });
    
    it('should call fetchSpecies with the correct parameter', () => {
      clean.cleanPeople(mockPeople);
      expect(api.fetchSpecies).toHaveBeenCalledWith('Species 1');
      expect(api.fetchSpecies).toHaveBeenCalledWith('Species 2');
    });
    
    it('should return an object with the correct structure', async () => {
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

  describe('cleanPlanets', () => {
    const mockPlanets = {
      planets: [
        {
          name: 'Tatooine',
          terrain: 'desert',
          climate: 'arid',
          population: '200000',
          residents: ['Resident 1', 'Resident 2']
        },
        {
          name: 'Alderaan',
          terrain: 'grasslands, mountains',
          climate: 'temperate',
          population: '2000000000',
          residents: ['Resident 3', 'Resident 4']
        }
      ]
    };
    api.fetchResidents = jest.fn(() => {
      return { residents: ['some person', 'some other person'] };
    });

    it('should call fetchResidents with the correct parameter', () => {
      clean.cleanPlanets(mockPlanets);
      expect(api.fetchResidents).toHaveBeenCalledWith(
        ['Resident 1', 'Resident 2']
      );
      expect(api.fetchResidents).toHaveBeenCalledWith(
        ['Resident 3', 'Resident 4']
      );
    });

    it('should return an object with the correct structure', async () => {
      const expected = {
        planets: [
          {
            name: 'Tatooine',
            terrain: 'desert',
            climate: 'arid',
            population: '200000',
            residents: ['some person', 'some other person']
          },
          {
            name: 'Alderaan',
            terrain: 'grasslands, mountains',
            climate: 'temperate',
            population: '2000000000',
            residents: ['some person', 'some other person']
          }
        ]
      };
      const result = await clean.cleanPlanets(mockPlanets);
      expect(result).toEqual(expected);
    });
  });

  describe('cleanVehicles', () => {
    it('should return an object with the correct structure', () => {
      const mockVehicles = {
        vehicles: [
          {
            name: 'AT-AT', 
            model: 'All Terrain Armored Transport', 
            passengers: '40', 
            vehicle_class: 'assault walker',
            extraKey: 'extra value'
          }
        ]
      };
      const expected = {
        vehicles: [
          {
            name: 'AT-AT', 
            model: 'All Terrain Armored Transport', 
            passengers: '40', 
            vehicle_class: 'assault walker',
          }
        ]
      };
      const result = clean.cleanVehicles(mockVehicles);
      expect(result).toEqual(expected);
    });
  });
})