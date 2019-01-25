import * as clean from './dataCleaner';

export const fetchOpeningCrawl = async () => {
  const response = await fetch('https://swapi.co/api/films/');
  if (response.ok) {
    const films = await response.json();
    const randomNum = Math.floor(Math.random() * films.count);
    return films.results[randomNum].opening_crawl;
  } else {
    throw Error(`${response.status}`);
  }
}

export const fetchData = async (categoryName) => {
  const url = `https://swapi.co/api/${categoryName}/`;
  const response = await fetch(url);
  if (response.ok) {
    const categoryData = (await response.json()).results;
    return { [categoryName]: categoryData };
  } else {
    throw Error(`${response.status}`);
  }
}

export const fetchHomeworld = async (url) => {
  const response = await fetch(url);
  if (response.ok) {
    const homeworld = await response.json();
    return ({
      homeworld: homeworld.name,
      population: homeworld.population
    });
  } else {
    throw Error(`${response.status}`);
  }
}

export const fetchSpecies = async (urls) => {
  if (urls.length > 0) {
    const response = await fetch(urls[0]);
    if (response.ok) {
      const species = await response.json();
      return { species: species.name };
    } else {
      throw Error(`${response.status}`);
    }
  }
  return { species: 'unknown' };
}

export const fetchResidents = async (urls) => {
  if (urls.length > 0) {
    const residents = await Promise.all(
      urls.map(async url => {
        const response = await fetch(url);
        if (response.ok) {
          return (await response.json()).name;
        } else {
          throw Error(`${response.status}`);
        }
      })
    );
    return { residents };
  }
  return { residents: ['unknown'] }
}

export const cleanData = async (categoryName, uncleanData) => {
  switch (categoryName) {
    case 'people':
      return clean.cleanPeople(uncleanData);
    case 'planets':
      return clean.cleanPlanets(uncleanData);
    case 'vehicles':
      return clean.cleanVehicles(uncleanData);
    default:
      break;
  }
}