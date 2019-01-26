import React from 'react';
import PropTypes from 'prop-types';

export const Card = ({ card, toggleFavorite }) => {
  const { favorite } = card;
  const displayedStats = Object.keys(card).filter(stat => {
    return stat !== 'category' && stat !== 'favorite';
  }); 
  const statLines = displayedStats.map(stat => {
    return stat === 'name' ?
      <h3 className="h3" key={stat}>{card.name}</h3> :
      <p className="p--stat" key={stat}>
        <span className="span span--key">{stat}:</span>
        <span className="span span--value">{card[stat]}</span>
      </p>
  });
  const cardClass = favorite ? 'Card--fav' : 'Card'
  const buttonClass = favorite ? 'button--fav' : 'button'
  return (
    <div className={cardClass}>
      {statLines}
      <button className={buttonClass} onClick={() => toggleFavorite(card)}>
        {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  )
}

Card.propTypes = {
  card: PropTypes.object,
  toggleFavorite: PropTypes.func
}