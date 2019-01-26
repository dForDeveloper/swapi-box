export const fetchData = async (url) => {
  const response = await fetch(url);
  if (response.ok) {
    return await response.json();
  } else {
    throw Error(`Error fetching data from ${url}. ${response.status}`);
  }
}