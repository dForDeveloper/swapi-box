import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      openingCrawl: ''
    };
  }

  async componentDidMount() {
    const response = await fetch('https://swapi.co/api/films/');
    const films = await response.json();
    const randomNum = Math.floor(Math.random() * films.count);
    const openingCrawl = films.results[randomNum].opening_crawl;
    this.setState({ openingCrawl });
  }

  render() {
    return (
      <div className="App">
        <p>{this.state.openingCrawl}</p>
      </div>
    );
  }
}

export default App;