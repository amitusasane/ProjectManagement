import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render, cleanup, wait, fireEvent } from '@testing-library/react';
import { toBeDisabled, toBeEmpty } from '@testing-library/jest-dom';
expect.extend({ toBeDisabled, toBeEmpty });

import AddUser from './AddUser';
import axios from 'axios';
jest.mock('axios');

describe('Add User Component', () => {
  const onSubmit = jest.fn();
  const fakeFirstName = 'SHREE User01';
  const fakeLastName = 'user last name';
  const fakeEmpId = '11';

  let userList = {
    data: [{ _id: '5df53177f576f77b78e0e6d9', firstName: 'User01', lastName: '01Last', empId: 1 }]
  };
  beforeEach(() => {
    axios.get.mockResolvedValue(userList);
  });
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
  it('Get user List ', async () => {
    const { container, getByText } = render(
      <Router>
        <AddUser />
      </Router>
    );
    expect(getByText('Users are not available in database!!'));
  });

  it('Should able to Add User ', async () => {
    const { container, getByText, getByPlaceholderText } = render(
      <Router>
        <AddUser />
      </Router>
    );
    const firstName = getByPlaceholderText('FirstName');
    const lastName = getByPlaceholderText('LastName');
    const empId = getByPlaceholderText('Employee ID');
    const submitBtn = getByText('Add');

    fireEvent.change(firstName, { target: { name: 'firstName', value: fakeFirstName } });
    fireEvent.change(lastName, { target: { name: 'lastName', value: fakeLastName } });
    fireEvent.change(empId, { target: { name: 'empId', value: fakeEmpId } });

    await wait(() => {
      expect(submitBtn).not.toBeDisabled();
      fireEvent.click(submitBtn);
    });
  });

  it('Should able to Edit User ', async () => {
    const { container, getByText, getByPlaceholderText } = render(
      <Router>
        <AddUser />
      </Router>
    );
    await wait(() => {
      const firstName = getByPlaceholderText('FirstName');
      const editBtn = getByText('Edit');

      fireEvent.click(editBtn);

      const updateBtn = getByText('Update');
      fireEvent.change(firstName, { target: { name: 'firstName', value: fakeFirstName } });

      expect(updateBtn).not.toBeDisabled();
      fireEvent.click(updateBtn);
    });
    //axios.post.mockResolvedValue({ message: 'User updated successfully' });
    //expect(getByText('User updated successfully'));
  });

  it('Should able to Delete User ', async () => {
    const { container, getByText, getByPlaceholderText } = render(
      <Router>
        <AddUser />
      </Router>
    );
    await wait(() => {
      const DeleteBtn = getByText('Delete');
      expect(DeleteBtn).not.toBeDisabled();
      fireEvent.click(DeleteBtn);
      //expect(getByText('User deleted successfully'));
    });
  });

  it('Should able to Reset User Form ', async () => {
    const { container, getByText, getByPlaceholderText } = render(
      <Router>
        <AddUser />
      </Router>
    );
    const firstName = getByPlaceholderText('FirstName');
    fireEvent.change(firstName, { target: { name: 'firstName', value: fakeFirstName } });
    const resetBtn = getByText('Reset');
    expect(resetBtn).not.toBeDisabled();
    fireEvent.click(resetBtn);
    expect(firstName).toBeEmpty();
  });

  it('Should able to Serach the user from user List ', async () => {
    const { container, getByText, getByPlaceholderText } = render(
      <Router>
        <AddUser />
      </Router>
    );
    await wait(() => {
      const searchInp = getByPlaceholderText('Search');
      fireEvent.change(searchInp, { target: { name: 'searchUser', value: 'User' } });
    });
    expect(getByText('FirstName : User01'));
  });
  it('Should able to click on sorting options ', async () => {
    const { container, getByText, getByTestId } = render(
      <Router>
        <AddUser />
      </Router>
    );
    await wait(() => {
      const sortFirstNameBtn = getByTestId('sortFirstName');
      const sortLastNameBtn = getByTestId('sortLastName');
      const sortIdBtn = getByTestId('sortId');

      fireEvent.click(sortFirstNameBtn);
      fireEvent.click(sortLastNameBtn);
      fireEvent.click(sortIdBtn);
      expect(sortFirstNameBtn).not.toBeDisabled();
    });
    expect(getByText('FirstName : User01'));
  });
});
