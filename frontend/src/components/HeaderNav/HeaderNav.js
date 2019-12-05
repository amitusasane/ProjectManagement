import React from 'react';
import { Row, Col, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const HeaderNav = () => {
  return (
    <>
      <Row className='no-gutters'>
        <Col>
          <Navbar bg='light' expand='lg' variant='light'>
            <LinkContainer to='/'>
              <Navbar.Brand>PM Tool</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='mr-auto pull-right'>
                <LinkContainer to='/addproject'>
                  <Nav.Link>Add project</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/addtask'>
                  <Nav.Link>Add task</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/adduser'>
                  <Nav.Link>Add User</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/viewtask'>
                  <Nav.Link>View Task</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </Row>
    </>
  );
};

export default HeaderNav;
