import React from 'react';
import { Row, Col, Jumbotron, Container } from 'react-bootstrap';
import '../../scss/common.scss';

const Home = () => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Jumbotron className="mt-5">
              <h1> Welcome to Project Management Tool!! </h1>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
