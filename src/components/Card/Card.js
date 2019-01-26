import React from 'react';
import PropTypes from 'prop-types';

export const Card = ({ card, toggleFavorite }) => {
  const { favorite } = card;
  const displayedStats = Object.keys(card).filter(stat => {
    return stat !== 'category' && stat !== 'favorite';
  }); 
  const statLines = displayedStats.map(stat => {
    return stat === 'name' ?
      <h3 key={stat}>{card.name}</h3> :
      <p key={stat}>{stat}: {card[stat]}</p>
  });
  return (
    <div>
      {statLines}
      <button onClick={() => toggleFavorite(card)}>
        {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  )
}

Card.propTypes = {
  card: PropTypes.object,
  toggleFavorite: PropTypes.func
}