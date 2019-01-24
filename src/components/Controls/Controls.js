import React from 'react';

const Controls = ({ favCount, activeCategory, setActiveCategory }) => {
  const buttonNames = ['people', 'planets', 'vehicles', 'favorites'];
  const buttons = buttonNames.map(name => {
    const buttonClass = name === activeCategory ? 'button-active' : '';
    const buttonText = name === 'favorites' ? `favorites ${favCount}` : name;
    return (
      <button
        className={buttonClass}
        key={name}
        onClick={() => setActiveCategory(name)}
      >
        {buttonText}
      </button>
    );
  });
  return(
    <nav>
      {buttons}
    </nav>
  );
}

export default Controls;