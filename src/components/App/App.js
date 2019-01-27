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
      activeCategory: '',
      film: {},
      people: [],
      planets: [],
      vehicles: [],
      favorites: []
    };
  }

  componentDidMount = async () => {
    try {
      const film = await helper.getFilm();
      this.setState({ film });
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
    if (this.state[categoryName].length === 0) {
      return <p className="h3--no-fav">nothing to display</p>
    }
    return this.state[categoryName].map(cardInfo => {
      return (
        <Card
          key={cardInfo.name}
          card={cardInfo}
          toggleFavorite={this.toggleFavorite}
        />
      );
    });
  }

  toggleFavorite = async (card) => {
    const { name, category, favorite } = card;
    const newArray = this.state[category].map(categoryItem => {
      if (categoryItem.name === name) {
        categoryItem.favorite = !favorite;
      }
      return categoryItem;
    });
    await this.setState({ [category]: newArray });
    this.updateFavorites({ ...card, favorite: !favorite });
  }

  updateFavorites = (card) => {
    const { favorites } = this.state;
    if (card.favorite) {
      this.setState({ favorites: [...favorites, card] });
    } else {
      const newFavorites = favorites.filter((favoritedCard) => {
        return favoritedCard.name !== card.name;
      });
      this.setState({ favorites: newFavorites });
    }
  }

  render() {
    const { favorites, activeCategory, film } = this.state;
    const { title, opening_crawl, release_date } = film;
    return (
      <div className="App">
        <h1
          className="h1"
          onClick={() => this.setState({ activeCategory: '' })}
        >
          swapi box
        </h1>
        <Controls
          favCount={favorites.length}
          activeCategory={activeCategory}
          setActiveCategory={this.setActiveCategory}
        />
        {
          activeCategory === '' &&
            <div className="div--open">
              <h3 className="h3--title">{title}</h3>
              <p className="p--opening-crawl">{opening_crawl}</p>
              <p className="p--release-date">{release_date}</p>
            </div>
        }
        {
          activeCategory !== '' && 
            <section className='section'>
              {this.getCards(activeCategory)}
            </section>
        }
      </div>
    );
  }
}

export default App;