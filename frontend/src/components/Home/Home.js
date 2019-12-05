import React from 'react';
import { Row, Jumbotron } from 'react-bootstrap';
import '../../scss/common.scss';

const Home = () => {
  return (
    <div className='container-fluid'>
      <div className='wrap-container' />
      <Row>
        <Jumbotron>
          <h1> Welcome to Project Management Tool!! </h1>
        </Jumbotron>
      </Row>
    </div>
  );
};

export default Home;
