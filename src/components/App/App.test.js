import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import * as api from '../../utils/api';

jest.mock('../../utils/api');

describe('App', () => {
  describe('componentDidMount', () => {
    it('should setState with an opening crawl', async () => {
      let wrapper = shallow(<App />);
      const expected = 'A long time ago in a galaxy far, far away...';
      api.fetchOpeningCrawl.mockResolvedValue(expected);
      await wrapper.instance().componentDidMount();
      expect(wrapper.state('openingCrawl')).toEqual(expected);
    });
  });
});