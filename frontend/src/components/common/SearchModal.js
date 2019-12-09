import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import Table from './Table';

const SearchModal = props => {
  const columns = [{ dataField: 'name', text: 'Project Name' }];
  const onSelectItem = selectedItem => {
    props.onSearch(selectedItem);
    props.onCloseModal();
  };

  return (
    <Modal show={props.showModal} onHide={props.onCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{props.heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          onClick={() => {
            onSelectItem(props.data[0]);
          }}
        >
          <Table columns={columns} data={props.data} keyField="id" />
          {props.data[0].name}
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default SearchModal;
