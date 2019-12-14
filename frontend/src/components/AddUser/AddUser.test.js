import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render, cleanup, wait } from '@testing-library/react';
import AddUser from './AddUser';

describe('Add User Component', () => {
  afterEach(cleanup);
  it('Should render Add User component', async () => {
    const { container } = render(
      <Router>
        <AddUser />
      </Router>
    );
    await wait(() => {
      expect(container).toMatchSnapshot();
    });
  });
  // it('Should render Add User component', () => {
  //   expect(true).toBe(true);
  // });
});
