import React from 'react';
import ReactDOM from 'react-dom';
import ArcanaComposer from './ArcanaComposer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ArcanaComposer />, div);
});
