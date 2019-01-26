import React from 'react';
import PropTypes from 'prop-types';

export const Card = ({ info }) => {
  const statLines = Object.keys(info).filter(key => {
    return (key !== 'name' && key !== 'category')
  }).map(stat => {
    return <p key={stat}>{stat}: {info[stat]}</p>
  });
  return (
    <div>
      <h3>{info.name}</h3>
      {statLines}
    </div>
  )
}

Card.propTypes = {
  info: PropTypes.object
}