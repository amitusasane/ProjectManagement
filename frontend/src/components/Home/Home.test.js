import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import Home from './Home';

describe('Home Component', () => {
  afterEach(cleanup);
  it('Should render Home component', () => {
    const { container } = render(
      <Router>
        <Home />
      </Router>
    );
    expect(container).toMatchSnapshot();
  });
});
