import React, { Component } from 'react';
import Controls from '../Controls/Controls';
import fetchData from '../../utils/fetchHelper';

class App extends Component {
  constructor() {
    super();
    this.state = {
      openingCrawl: '',
      people: [],
      planets: [],
      vehicles: [],
      favorites: [],
      activeCategory: ''
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
    const length = this.state[categoryName].length
    const newState = await fetchData(categoryName, length);
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