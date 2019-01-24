import { fetchHomeworld, fetchSpecies, fetchResidents } from './fetchHelper';

const cleanPeople = async ({ people }) => {
  const cleanedPeople = await Promise.all(
    people.map(async person => {
      const { name } = person;
      const { homeworld, population } = await fetchHomeworld(person.homeworld);
      const { species } = await fetchSpecies(person.species);
      return { name, homeworld, population, species };
    })
  );
  return { people: cleanedPeople };
}

const cleanPlanets = async ({ planets }) => {
  const cleanedPlanets = await Promise.all(
    planets.map(async planet => {
      const { name, terrain, population, climate } = planet;
      const { residents } = await fetchResidents(planet.residents);
      return ({ name, terrain, population, climate, residents });
    })
  );
  return { planets: cleanedPlanets };
}

const cleanVehicles = ({ vehicles }) => {
  const cleanedVehicles = vehicles.map(vehicle => {
    const { name, model, vehicle_class, passengers } = vehicle;
    return { name, model, vehicle_class, passengers };
  });
  return { vehicles: cleanedVehicles };
}

const cleanData = async (categoryName, uncleanData) => {
  switch (categoryName) {
    case 'people':
      return cleanPeople(uncleanData);
    case 'planets':
      return cleanPlanets(uncleanData);
    case 'vehicles':
      return cleanVehicles(uncleanData);
    default:
      break;
  }
}

export default cleanData;