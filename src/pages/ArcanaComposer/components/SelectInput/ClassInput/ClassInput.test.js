import React from 'react';
import ReactDOM from 'react-dom';
import ClassInput from './ClassInput';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ClassInput />, div);
});
