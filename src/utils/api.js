export const fetchOpeningCrawl = async () => {
  const response = await fetch('https://swapi.co/api/films/');
  const films = await response.json();
  const randomNum = Math.floor(Math.random() * films.count);
  return films.results[randomNum].opening_crawl;
}

export const fetchData = async (categoryName) => {
  const url = `https://swapi.co/api/${categoryName}/`;
  const response = await fetch(url);
  const categoryData = (await response.json()).results;
  return { [categoryName]: categoryData };
}

const fetchHomeworld = async (url) => {
  const response = await fetch(url);
  const homeworld = await response.json();
  return ({
    homeworld: homeworld.name,
    population: homeworld.population
  });
}

const fetchSpecies = async (urls) => {
  if (urls.length > 0) {
    const response = await fetch(urls[0]);
    const species = await response.json();
    return { species: species.name };
  }
  return { species: 'unknown' };
}

const fetchResidents = async (urls) => {
  if (urls.length > 0) {
    const residents = await Promise.all(
      urls.map(async url => {
        const response = await fetch(url);
        return (await response.json()).name;
      })
    )
    return { residents };
  }
  return { residents: ['unknown'] }
}

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

export const cleanData = async (categoryName, uncleanData) => {
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