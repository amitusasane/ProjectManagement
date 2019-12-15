import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import HeaderNav from './components/HeaderNav/HeaderNav';
import AddUser from './components/AddUser/AddUser';
import AddProject from './components/AddProject/AddProject';
import AddTask from './components/AddTask/AddTask';
import ViewTask from './components/ViewTask/ViewTask';
import { Row, Col } from 'react-bootstrap';

function App() {
  return (
    <>
      <Router>
        <Row className="no-gutters">
          <Col>
            <HeaderNav />
          </Col>
        </Row>
        <Row className="no-gutters">
          <Col>
            <Switch>
              <Route exact strict path="/" component={Home} />
              <Route exact strict path="/adduser" component={AddUser} />
              <Route exact strict path="/addproject" component={AddProject} />
              <Route exact strict path="/addtask" component={AddTask} />
              <Route exact strict path="/viewtask" component={ViewTask} />
            </Switch>
          </Col>
        </Row>
      </Router>
    </>
  );
}

export default App;
