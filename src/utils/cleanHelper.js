import { fetchHomeworld, fetchSpecies } from './fetchHelper';

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

const cleanPlanets = ({ planets }) => {
  return { planets };
}

const cleanVehicles = ({ vehicles }) => {
  return { vehicles };
}

const cleanData = async (categoryName, uncleanData) => {
  switch (categoryName) {
    case 'people':
      return await cleanPeople(uncleanData);
    case 'planets':
      return await cleanPlanets(uncleanData);
    case 'vehicles':
      return await cleanVehicles(uncleanData);
    default:
      break;
  }
}

export default cleanData;