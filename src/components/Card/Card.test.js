import React from 'react';
import { Card } from '../Card/Card';
import { shallow } from 'enzyme';

describe('Card', () => {
  const mockToggleFavorite = jest.fn();
  const mockPerson = {
    name: 'Luke Skywalker',
    Species: 'Human',
    Homeworld: 'some planet',
    'Population of some planet': '5 thousand',
    favorite: false,
    category: 'people'
  };
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Card
        key={mockPerson.name}
        card={mockPerson}
        toggleFavorite={mockToggleFavorite}
      />
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  it('should call toggleFavorite when the button is clicked', () => {
    wrapper.find('button').simulate('click');
    expect(mockToggleFavorite).toHaveBeenCalled();
  });
});