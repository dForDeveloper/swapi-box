import React from 'react';
import PropTypes from 'prop-types';

export const Card = ({ info }) => {
  const statLines = Object.keys(info).map(stat => {
    if (stat === 'name') {
      return <h3 key={stat}>{info.name}</h3>
    }
    return <p key={stat}>{stat}: {info[stat]}</p>
  });
  return <div>{statLines}</div>
}

Card.propTypes = {
  info: PropTypes.object
}