/** @format */

import React from 'react';
import { Container } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import HeaderNav from './components/HeaderNav/HeaderNav';
import AddUser from './components/AddUser/AddUser';
import AddProject from './components/AddProject/AddProject';
import AddTask from './components/AddTask/AddTask';
import ViewTask from './components/ViewTask/ViewTask';

function App() {
  return (
    <Container fluid>
      <Router>
        <HeaderNav />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/adduser' component={AddUser} />
          <Route exact path='/addproject' component={AddProject} />
          <Route exact path='/addtask' component={AddTask} />
          <Route exact path='/viewtask' component={ViewTask} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
