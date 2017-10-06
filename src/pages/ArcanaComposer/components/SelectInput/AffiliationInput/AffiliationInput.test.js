import React from 'react';
import ReactDOM from 'react-dom';
import AffiliationInput from './AffiliationInput';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AffiliationInput />, div);
});
