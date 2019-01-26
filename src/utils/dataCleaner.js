import * as helper from './apiHelper';

export const cleanPeople = async (people) => {
  const cleanedPeople = await Promise.all(
    people.map(async person => {
      const category = 'people';
      const { name } = person;
      const { homeworld, population } = (
        await helper.getHomeworld(person.homeworld)
      );
      const { species } = await helper.getSpecies(person.species);
      return { category, name, homeworld, population, species };
    })
  );
  return { people: cleanedPeople };
}

export const cleanPlanets = async (planets) => {
  const cleanedPlanets = await Promise.all(
    planets.map(async planet => {
      const category = 'planets'
      const { name, terrain, population, climate } = planet;
      const { residents } = await helper.getResidents(planet.residents);
      return ({ category, name, terrain, population, climate, residents });
    })
  );
  return { planets: cleanedPlanets };
}

export const cleanVehicles = (vehicles) => {
  const cleanedVehicles = vehicles.map(vehicle => {
    const category = 'vehicles';
    const { name, model, vehicle_class, passengers } = vehicle;
    return { category, name, model, vehicle_class, passengers };
  });
  return { vehicles: cleanedVehicles };
}