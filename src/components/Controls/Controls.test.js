import React from 'react';
import { Controls } from './Controls';
import { shallow } from 'enzyme';

describe('Controls', () => {
  it('should match the snapshot', () => {
    const mockSetActiveCategory = jest.fn();
    let wrapper = shallow(
      <Controls
        favCount={0}
        activeCategory={''}
        setActiveCategory={mockSetActiveCategory}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});