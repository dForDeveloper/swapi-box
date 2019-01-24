const fetchPeople = async () => {
  const people = [];
  const response = await fetch('https://swapi.co/api/people/?page=1');
  const peopleData = await response.json();
  people.push(...peopleData.results)
  return { people };
}

const fetchPlanets = async () => {
  const planets = [];
  const response = await fetch('https://swapi.co/api/planets/?page=1');
  const planetData = await response.json();
  planets.push(...planetData.results);
  return { planets };
}

const fetchVehicles = async () => {
  const vehicles = [];
  const response = await fetch('https://swapi.co/api/vehicles/?page=1');
  const vehiclesData = await response.json();
  vehicles.push(...vehiclesData.results);
  return { vehicles };
}

const fetchSwitch = async (categoryName, { people, planets, vehicles }) => {
  switch (categoryName) {
    case 'people':
      return people.length === 0 ? await fetchPeople() : {};
    case 'planets':
      return planets.length === 0 ? await fetchPlanets() : {};
    case 'vehicles':
      return vehicles.length === 0 ? await fetchVehicles() : {};
    default:
      return {};
  }
}

export default fetchSwitch;