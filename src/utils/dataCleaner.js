import * as helper from './apiHelper';

const getPopulationAbbreviation = (population) => {
  const populationLog1000 = Math.floor(Math.log10(parseInt(population)) / 3);
  switch (populationLog1000) {
    case 1:
      return population.slice(0, -3) + ' thousand';
    case 2:
      return population.slice(0, -6) + ' million';
    case 3:
      return population.slice(0, -9) + ' billion';
    case 4:
      return population.slice(0, -12) + ' trillion';
    default:
      return 'unknown';
  }
}

export const cleanPeople = async (people) => {
  const cleanedPeople = await Promise.all(
    people.map(async person => {
      const { name } = person;
      const { homeworld, population } = (
        await helper.getHomeworld(person.homeworld)
      );
      const { species } = await helper.getSpecies(person.species);
      const populationKey = `Population of ${homeworld}`;
      const populationAbbrev = getPopulationAbbreviation(population);
      return {
        name,
        favorite: false,
        category: 'people',
        Homeworld: homeworld,
        [populationKey]: populationAbbrev,
        Species: species
      };
    })
  );
  return { people: cleanedPeople };
}

export const cleanPlanets = async (planets) => {
  const cleanedPlanets = await Promise.all(
    planets.map(async planet => {
      const { name, terrain, population, climate } = planet;
      const populationAbbrev = getPopulationAbbreviation(population);
      let { residents } = await helper.getResidents(planet.residents);
      residents = residents.reduce((acc, resident, index) => {
        if (index === residents.length - 1 && index > 1) {
          acc += `, and ${resident}`;
        } else if (index === residents.length - 1 && index === 1) {
          acc += ` and ${resident}`;
        } else if (index > 0) {
          acc += `, ${resident}`;
        }
        return acc;
      }, residents[0]);
      return ({
        name,
        favorite: false,
        category: 'planets',
        Terrain: terrain,
        Population: populationAbbrev,
        Climate: climate,
        Residents: residents
      });
    })
  );
  return { planets: cleanedPlanets };
}

export const cleanVehicles = (vehicles) => {
  const cleanedVehicles = vehicles.map(vehicle => {
    const { name, model, vehicle_class, passengers } = vehicle;
    return {
      name,
      favorite: false,
      category: 'vehicles',
      Model: model,
      Class: vehicle_class,
      'Passenger Capacity': passengers
    };
  });
  return { vehicles: cleanedVehicles };
}