import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Table from './Table';

describe('Table Component', () => {
  afterEach(cleanup);
  const columns = [{ dataField: 'projectName', text: 'Project List' }];
  const rowClickHandler = jest.fn();
  const data = [{ projectName: 'Project 01' }, { projectName: 'Project 02' }];
  it('Should render Table component', () => {
    const { container } = render(<Table data={data} columns={columns} />);
    expect(container).toMatchSnapshot();
  });

  it('should be clickable', () => {
    const { container, getByText } = render(
      <Table data={data} columns={columns} rowClickHandler={rowClickHandler(data[0].name)} />
    );
    const firstRow = getByText('Project 01');
    fireEvent.click(firstRow);
    expect(container).toMatchSnapshot();
  });
});
