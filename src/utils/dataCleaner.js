import * as api from './api';

export const cleanPeople = async ({ people }) => {
  const cleanedPeople = await Promise.all(
    people.map(async person => {
      const { name } = person;
      const { homeworld, population } = await api.fetchHomeworld(person.homeworld);
      const { species } = await api.fetchSpecies(person.species);
      return { name, homeworld, population, species };
    })
  );
  return { people: cleanedPeople };
}

export const cleanPlanets = async ({ planets }) => {
  const cleanedPlanets = await Promise.all(
    planets.map(async planet => {
      const { name, terrain, population, climate } = planet;
      const { residents } = await api.fetchResidents(planet.residents);
      return ({ name, terrain, population, climate, residents });
    })
  );
  return { planets: cleanedPlanets };
}

export const cleanVehicles = ({ vehicles }) => {
  const cleanedVehicles = vehicles.map(vehicle => {
    const { name, model, vehicle_class, passengers } = vehicle;
    return { name, model, vehicle_class, passengers };
  });
  return { vehicles: cleanedVehicles };
}