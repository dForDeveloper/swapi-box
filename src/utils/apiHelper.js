import { fetchData } from './api';

export const getOpeningCrawl = async () => {
  const films = await fetchData('https://swapi.co/api/films/');
  const randomNum = Math.floor(Math.random() * films.count);
  return films.results[randomNum].opening_crawl;
}

export const getHomeworld = async (url) => {
  const homeworld = await fetchData(url);
  return ({
    homeworld: homeworld.name,
    population: homeworld.population
  });
}

export const getSpecies = async (urls) => {
  if (urls.length > 0) {
    const species = await fetchData(urls[0]);;
    return { species: species.name };
  }
  return { species: 'unknown' };
}

export const getResidents = async (urls) => {
  if (urls.length > 0) {
    const residents = await Promise.all(
      urls.map(async url => {
        const resident = await fetchData(url);
        return resident.name;
      })
    );
    return { residents };
  }
  return { residents: ['unknown'] }
}