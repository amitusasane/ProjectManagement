import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import SearchModal from './SearchModal';

describe('Search Modal Component', () => {
  afterEach(cleanup);
  let showModal = true;
  const onCloseModal = jest.fn();
  const columns = [{ dataField: 'projectName', text: 'Project List' }];
  const data = [{ projectName: 'Project 01' }, { projectName: 'Project 02' }];
  const onSearch = jest.fn();
  it('Should render Search Modal component', () => {
    const { container } = render(<SearchModal />);
    expect(container).toMatchSnapshot();
  });

  it('should handle prop', () => {
    const { container, getByText } = render(
      <SearchModal
        showModal={showModal}
        data={data}
        columns={columns}
        onCloseModal={() => (showModal = false)}
        onSearch={() => onSearch(data[0].projectName)}
      />
    );
    const firstRow = getByText('Project 01');
    fireEvent.click(firstRow);
    expect(container).toMatchSnapshot();
  });
});
