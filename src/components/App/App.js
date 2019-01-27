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
      favorites: [],
      currentPage: 0,
      pageData: {}
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
      const { pageData } = this.state;
      let newState = {};
      const length = this.state[categoryName].length;
      if (categoryName !== 'favorites' && length === 0) {
        const data = await api.fetchData(
          `https://swapi.co/api/${categoryName}/`
        );
        const pageCount = Math.ceil(data.count / 10);
        await this.setState({
          pageData: { ...pageData, [categoryName]: pageCount }
        });
        newState = await this.cleanData(categoryName, data.results);
      } else if (categoryName === 'favorites') {
        const pageCount = Math.ceil(this.state.favorites.length / 10);
        await this.setState({
          pageData: { ...pageData, [categoryName]: pageCount }
        });
      }
      this.setState({
        ...newState,
        activeCategory: categoryName,
        currentPage: 1
      });
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
    const { currentPage } = this.state;
    return this.state[categoryName].filter((cardInfo, index) => {
      return index < currentPage * 10 && index >= (currentPage - 1) * 10;
    }).map(cardInfo => {
      return (
        <Card
          key={cardInfo.name}
          card={cardInfo}
          toggleFavorite={this.toggleFavorite}
        />
      );
    });
  }

  getPageButtons = (categoryName) => {
    const { currentPage, pageData } = this.state;
    if (currentPage === 1 &&
      (categoryName !== 'favorites' ||
      this.state.favorites.length > 10)) {
        return (
          <div className="section--div-button">
            <button
              className="button-next"
              onClick={() => this.getNextPage(categoryName, currentPage)}
            >
              Next
            </button>
          </div>
        );
    } else if (currentPage < pageData[categoryName]) {
      return (
        <div className="section--div-button">
          <button
            className="button-previous"
            onClick={() => this.setState({ currentPage: currentPage - 1 })}
          >
            Previous
          </button>
          <button
            className="button-next"
            onClick={() => this.getNextPage(categoryName, currentPage)}
          >
            Next
          </button>
        </div>
      );
    } else if (currentPage > 1 && currentPage === pageData[categoryName]) {
      return (
        <div className="section--div-button">
          <button
            className="button-previous"
            onClick={() => this.setState({ currentPage: currentPage - 1 })}
          >
            Previous
          </button>
        </div>
      );
    }
  }

  getNextPage = async (categoryName, currentPage) => {
    const length = this.state[categoryName].length;
    if (categoryName !== 'favorites' && !(length > currentPage * 10)) {
      try {
        const data = await api.fetchData(
          `https://swapi.co/api/${categoryName}/?page=${currentPage + 1}`
        );
        const newState = await this.cleanData(categoryName, data.results);
        this.setState({
          currentPage: currentPage + 1,
          [categoryName]: [
            ...this.state[categoryName],
            ...newState[categoryName]
          ]
        });
      } catch (error) {
        this.setState({ errorStatus: error.message });
      }
    } else {
      this.setState({ currentPage: currentPage + 1 });
    }
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
              {this.getPageButtons(activeCategory)}
            </section>
        }
      </div>
    );
  }
}

export default App;