import React from 'react';
import ReactDOM from 'react-dom';
import ImageInput from './ImageInput';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ImageInput />, div);
});
