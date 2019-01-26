import React, { Component } from 'react';
import { Controls } from '../Controls/Controls';
import { Card } from '../Card/Card';
import * as api from '../../utils/api';
import * as clean from '../../utils/dataCleaner';
import * as helper from '../../utils/apiHelper';

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
    try {
      const openingCrawl = await helper.getOpeningCrawl();
      this.setState({ openingCrawl });
    } catch (error) {
      this.setState({ errorStatus: error.message });
    }
  }

  setActiveCategory = async (categoryName) => {
    try {
      let newState = {};
      const length = this.state[categoryName].length;
      if (categoryName !== 'favorites' && length === 0) {
        const data = await api.fetchData(`https://swapi.co/api/${categoryName}/`);
        newState = await this.cleanData(categoryName, data.results);
      }
      this.setState({ ...newState, activeCategory: categoryName });
    } catch (error) {
      this.setState({ errorStatus: error.message });
    }
  }

  cleanData = async (categoryName, uncleanData) => {
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

  getCards = (categoryName) => {
    return this.state[categoryName].map(cardInfo => {
      return <Card key={cardInfo.name} info={cardInfo} />
    });
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
        {activeCategory === '' && <p>{openingCrawl}</p>}
        {activeCategory !== '' && this.getCards(activeCategory)}
      </div>
    );
  }
}

export default App;