import React from 'react';
import ReactDOM from 'react-dom';
import RarityInput from './RarityInput';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RarityInput />, div);
});
