import React, { Component } from 'react';
import { Controls } from '../Controls/Controls';
import * as api from '../../utils/api';

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
    const openingCrawl = await api.fetchOpeningCrawl();
    this.setState({ openingCrawl });
  }

  setActiveCategory = async (categoryName) => {
    let newState = {};
    const length = this.state[categoryName].length;
    if (categoryName !== 'favorites' && length === 0) {
      const result = await api.fetchData(categoryName);
      newState = await api.cleanData(categoryName, result);
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