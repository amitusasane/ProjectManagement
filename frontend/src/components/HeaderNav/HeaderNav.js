import React from 'react';
import { Row, Col, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './HeaderNav.scss';
const HeaderNav = () => {
  return (
    <>
      <Row className="no-gutters">
        <Col>
          <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <a className="navbar-brand" href="/">
                PM Tool
              </a>
              <Nav className="mr-auto pull-right">
                <LinkContainer to="/addproject">
                  <Nav.Link>Add project</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/addtask">
                  <Nav.Link>Add task</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/adduser">
                  <Nav.Link>Add User</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/viewtask">
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
