import React from 'react';
import ReactDOM from 'react-dom';
import Arcana from './Arcana';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Arcana />, div);
});
