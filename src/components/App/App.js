import React, { Component } from 'react';
import Controls from '../Controls/Controls';
import { fetchData } from '../../utils/fetchHelper';
import cleanData from '../../utils/cleanHelper';

class App extends Component {
  constructor() {
    super();
    this.state = {
      openingCrawl: '',
      activeCategory: '',
      people: [],
      planets: [],
      vehicles: [],
      favorites: []
    };
  }

  componentDidMount = async () => {
    const response = await fetch('https://swapi.co/api/films/');
    const films = await response.json();
    const randomNum = Math.floor(Math.random() * films.count);
    const openingCrawl = films.results[randomNum].opening_crawl;
    this.setState({ openingCrawl });
  }

  setActiveCategory = async (categoryName) => {
    let newState = {};
    const length = this.state[categoryName].length;
    if (categoryName !== 'favorites' && length === 0) {
      const result = await fetchData(categoryName);
      newState = await cleanData(categoryName, result);
    }
    this.setState({ ...newState, activeCategory: categoryName });
  }

  render() {
    const { favorites, activeCategory, openingCrawl } = this.state;
    return (
      <div className="App">
        <Controls
          favCount={favorites.length}
          activeCategory={activeCategory}
          setActiveCategory={this.setActiveCategory}
        />
        <p>{openingCrawl}</p>
      </div>
    );
  }
}

export default App;