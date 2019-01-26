import * as clean from './dataCleaner';
import * as helper from './apiHelper';

describe('dataCleaner', () => {
  describe('cleanPeople', () => {
    const mockPeople = [
      {
        name: 'Luke Skywalker',
        homeworld: 'planetUrl1',
        species: 'speciesUrl1'
      },
      {
        name: 'Han Solo',
        homeworld: 'planetUrl2',
        species: 'speciesUrl2'
      }
    ];
    helper.getHomeworld = jest.fn(() => {
      return ({
        homeworld: 'some planet',
        population: '5000'
      });
    });
    helper.getSpecies = jest.fn(() => {
      return { species: 'Human' };
    });
    
    it('should call getHomeworld with the correct parameters', () => {
      clean.cleanPeople(mockPeople);
      expect(helper.getHomeworld).toHaveBeenCalledWith('planetUrl1');
      expect(helper.getHomeworld).toHaveBeenCalledWith('planetUrl2');
    });
    
    it('should call getSpecies with the correct parameters', () => {
      clean.cleanPeople(mockPeople);
      expect(helper.getSpecies).toHaveBeenCalledWith('speciesUrl1');
      expect(helper.getSpecies).toHaveBeenCalledWith('speciesUrl2');
    }); 
    
    it('should return an object with the correct structure', async () => {
      const expected = {
        people: [
          {
            name: 'Luke Skywalker',
            Species: 'Human',
            Homeworld: 'some planet',
            'Population of some planet': '5 thousand'
          },
          {
            name: 'Han Solo',
            Species: 'Human',
            Homeworld: 'some planet',
            'Population of some planet': '5 thousand'
          }
        ]
      };
      const result = await clean.cleanPeople(mockPeople);
      expect(result).toEqual(expected);
    });
  });

  describe('cleanPlanets', () => {
    const mockPlanets = [
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
    ];
    helper.getResidents = jest.fn(() => {
      return { residents: ['some person', 'some other person'] };
    });

    it('should call getResidents with the correct parameter', () => {
      clean.cleanPlanets(mockPlanets);
      expect(helper.getResidents).toHaveBeenCalledWith(
        ['Resident 1', 'Resident 2']
      );
      expect(helper.getResidents).toHaveBeenCalledWith(
        ['Resident 3', 'Resident 4']
      );
    });

    it('should return an object with the correct structure', async () => {
      const expected = {
        planets: [
          {
            name: 'Tatooine',
            Terrain: 'desert',
            Climate: 'arid',
            Population: '200 thousand',
            Residents: 'some person and some other person'
          },
          {
            name: 'Alderaan',
            Terrain: 'grasslands, mountains',
            Climate: 'temperate',
            Population: '2 billion',
            Residents: 'some person and some other person'
          }
        ]
      };
      const result = await clean.cleanPlanets(mockPlanets);
      expect(result).toEqual(expected);
    });
  });

  describe('cleanVehicles', () => {
    it('should return an object with the correct structure', () => {
      const mockVehicles = [
        {
          name: 'AT-AT', 
          model: 'All Terrain Armored Transport', 
          passengers: '40', 
          vehicle_class: 'assault walker',
          extraKey: 'extra value'
        }
      ];
      const expected = {
        vehicles: [
          {
            name: 'AT-AT', 
            Model: 'All Terrain Armored Transport', 
            'Passenger Capacity': '40', 
            Class: 'assault walker'
          }
        ]
      };
      const result = clean.cleanVehicles(mockVehicles);
      expect(result).toEqual(expected);
    });
  });
});