import React from 'react';
import ReactDOM from 'react-dom';
import CostInput from './CostInput';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CostInput />, div);
});
