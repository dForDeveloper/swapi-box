import * as clean from './dataCleaner';
import * as helper from './apiHelper';

describe('dataCleaner', () => {
  describe('cleanPeople', () => {
    const mockPeople = [
      {
        name: 'Luke Skywalker',
        homeworld: 'planetUrl1',
        species: 'speciesUrl1',
        birth_year: '19BBY',
      },
      {
        name: 'Han Solo',
        homeworld: 'planetUrl2',
        species: 'speciesUrl2',
        birth_year: '29BBY',
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
            'Population of some planet': '5 thousand',
            'Year of birth': '19BBY',
            favorite: false,
            category: 'people'
          },
          {
            name: 'Han Solo',
            Species: 'Human',
            Homeworld: 'some planet',
            'Population of some planet': '5 thousand',
            'Year of birth': '29BBY',
            favorite: false,
            category: 'people'
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
            Residents: 'some person and some other person',
            favorite: false,
            category: 'planets'
          },
          {
            name: 'Alderaan',
            Terrain: 'grasslands, mountains',
            Climate: 'temperate',
            Population: '2 billion',
            Residents: 'some person and some other person',
            favorite: false,
            category: 'planets'
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
          cost_in_credits: '123456',
          extraKey: 'extra value'
        }
      ];
      const expected = {
        vehicles: [
          {
            name: 'AT-AT', 
            Model: 'All Terrain Armored Transport', 
            'Passenger Capacity': '40', 
            Class: 'assault walker',
            Cost: '123456',
            favorite: false,
            category: 'vehicles'
          }
        ]
      };
      const result = clean.cleanVehicles(mockVehicles);
      expect(result).toEqual(expected);
    });
  });

  describe('getPopulationAbbreviation', () => {
    it('returns the correct string for 1000-999999', () => {
      const result = clean.getPopulationAbbreviation('123456');
      expect(result).toEqual('123 thousand');
    });
    
    it('returns the correct string for 1000000-999999999', () => {
      const result = clean.getPopulationAbbreviation('1234567');
      expect(result).toEqual('1 million');
    });
    
    it('returns the correct string for 1000000000-999999999999', () => {
      const result = clean.getPopulationAbbreviation('9000000000');
      expect(result).toEqual('9 billion');
    });
    
    it('returns the correct string for 1000000000000-999999999999999', () => {
      const result = clean.getPopulationAbbreviation('33000000000000');
      expect(result).toEqual('33 trillion');
    });
    
    it('returns the correct string for unknown', () => {
      const result = clean.getPopulationAbbreviation('unknown');
      expect(result).toEqual('unknown');
    });
  });
});