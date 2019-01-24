import { fetchHomeworld, fetchSpecies, fetchResidents } from './fetchHelper';

const cleanPeople = async ({ people }) => {
  const cleanedPeople = await Promise.all(
    people.map(async person => {
      const { homeworld, population } = await fetchHomeworld(person.homeworld);
      const { species } = await fetchSpecies(person.species);
      return { ...person, homeworld, population, species };
    })
  );
  console.log(cleanedPeople);
  return { people: cleanedPeople };
}

const cleanPlanets = async ({ planets }) => {
  const cleanedPlanets = await Promise.all(
    planets.map(async planet => {
      const { residents } = await fetchResidents(planet.residents);
      return { ...planet, residents }
    })
  )
  return { planets: cleanedPlanets };
}

const cleanData = async (categoryName, uncleanData) => {
  switch (categoryName) {
    case 'people':
      return await cleanPeople(uncleanData);
    case 'planets':
      return await cleanPlanets(uncleanData);
    case 'vehicles':
      return uncleanData;
    default:
      break;
  }
}

export default cleanData;