import React from 'react';
import ReactDOM from 'react-dom';
import WeaponInput from './WeaponInput';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WeaponInput />, div);
});
