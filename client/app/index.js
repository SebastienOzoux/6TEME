import React from 'react';
import { render } from 'react-dom';


import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';
import Sign from './components/Sign/Sign';
import Home from './components/Home/Home';
import HomeP from './components/Home/HomeP';
import HomeM from './components/Home/HomeM';
import AddMed from './components/Infos/AddMed';
import PatientL from './components/Infos/PatientList';
import Temperature from './components/Infos/Temperature';
import Tension from './components/Infos/Tension';
import Breathe from './components/Infos/Breathe';
import Cardio from './components/Infos/Cardio';
import UserList from './components/Admin/UserList';

import './styles/styles.scss';


  render((
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/homep" component={HomeP}/>
          <Route exact path="/homem" component={HomeM}/>
          <Route exact path="/sign" component={Sign}/>
          <Route exact path="/addmed" component={AddMed}/>
          <Route exact path="/patientl" component={PatientL}/>
          <Route exact path="/temperature" component={Temperature}/>
          <Route exact path="/tension" component={Tension}/>
          <Route exact path="/breathe" component={Breathe}/>
          <Route exact path="/cardio" component={Cardio}/>
          <Route exact path="/userlist" component={UserList}/>
          <Route component={NotFound}/>
        </Switch>
      </App>
    </Router>
  ), document.getElementById('app'));
