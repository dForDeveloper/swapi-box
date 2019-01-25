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

export const fetchHomeworld = async (url) => {
  const response = await fetch(url);
  const homeworld = await response.json();
  return ({
    homeworld: homeworld.name,
    population: homeworld.population
  });
}

export const fetchSpecies = async (urls) => {
  if (urls.length > 0) {
    const response = await fetch(urls[0]);
    const species = await response.json();
    return { species: species.name };
  }
  return { species: 'unknown' };
}

export const fetchResidents = async (urls) => {
  if (urls.length > 0) {
    const residents = await Promise.all(
      urls.map(async url => {
        const response = await fetch(url);
        return (await response.json()).name;
      })
    );
    return { residents };
  }
  return { residents: ['unknown'] }
}