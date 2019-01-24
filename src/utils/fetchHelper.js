const fetchAllPages = async (baseUrl, pageCount) => {
  const urls = [];
  for (let i = 1; i <= pageCount; i++) {
    urls.push(`${baseUrl}?page=${i}`);
  }
  const responses = await Promise.all(
    urls.map(async url => {
      const response = await fetch(url);
      return await response.json();
    })
  );
  return responses.reduce((acc, response) => {
    acc.push(...response.results);
    return acc;
  }, []);
}

const fetchData = async (categoryName, length) => {
  if (categoryName !== 'favorites' && length === 0) {
    const url = `https://swapi.co/api/${categoryName}/`;
    const response = await fetch(url);
    const responseData = await response.json();
    const pageCount = (Math.ceil(responseData.count / 10));
    const allData = await fetchAllPages(url, pageCount);
    return { [categoryName]: allData };
  }
  return {};
}

export default fetchData;