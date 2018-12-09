import React, { Component } from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';

import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';


class PatientL extends Component {
  constructor(props) {
    super(props);

    this.state = {
      patients: [],
      patient: [],
      fname: [],
      lname: [],
      isLoading: true,
      infoP: '',
      emailP: '',
      search: '',
      filterList: [],
    };


  }

  componentDidMount() {

    this.setState({
      isLoading: true,
    });

    const obj = getFromStorage('6teme_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/verify?token=' + token)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            patients: json.patient + ""
          });
          var patient = this.state.patients.split(',');
          this.setState({
            patient: patient,
            isLoading: false
          });
          for(var i=0; i<this.state.patient.length; i++){
            fetch('/api/account/getname', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                email: patient[i],
              }),
            }).then(res => res.json())
            .then(json => {
              if (json.success) {
                this.setState({
                  fname: [...this.state.fname, json.Fname],
                  lname: [...this.state.lname, json.Lname]
                });
              }
            });
          }
        }
      });
    }
  }

  handleRadio(e) {
    this.setState({
      infoP: this.state.fname[e.currentTarget.value] + " " + this.state.lname[e.currentTarget.value],
      emailP: this.state.patient[e.currentTarget.value]
    });
  }

  fltrList(event) {
    this.setState({
      search: event.target.value
    });
  }

  handleClick(){
    const obj = getFromStorage('6teme_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/consulting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.emailP,
          token: token
        }),
      });

  }
}


  render(){

    const {
      isLoading,
      fname,
      lname,
      infoP,
      patient,
      search,
    } = this.state;

    let {
      filterList
    } = this.state;

    let list = [];
    for(var i=0; i<fname.length; i++){
      list.push(fname[i] + " " + lname[i]);
    }

  filterList = list.filter((name) =>
    name.toLowerCase().indexOf(search.toLowerCase()) > -1
  );

  let listItems = filterList.map((item, key) =>
  <div class="col-md-6">
  <label class="container-r border rounded hvr-grow">{item}
  <input type="radio" name="patients" value={key} onChange={this.handleRadio.bind(this)}/>
  <span class="checkmark"></span>
  </label>
  </div>
  );

  if (isLoading) {
    return (
      <div class="container mt-4">
      <div class="row">
      <div id="loader">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="lading"></div>
      </div>
      </div>
      </div>
    );
  }

  if(infoP){
    return(
      <div class="container-fluid d-inline-block mt-4">

      <div class="row">
      <div class="container col-md-7">

      <div class="row">
      <div class="col-md-6">
      <Link to="/temperature" class="tile purple hvr-glow" onClick={this.handleClick.bind(this)}>
      <h2>Température</h2>
      <p>Cliquez pour voir la température de <b>{infoP}</b>.</p>
      </Link>
      </div>
      <div class="col-md-6">
      <Link to="/tension" class="tile orange hvr-glow">
      <h2>Tension</h2>
      <p>Cliquez pour voir la tension de <b>{infoP}</b>.</p>
      </Link>
      </div>
      </div>

      <div class="row">
      <div class="col-md-6">
      <Link to="/breathe" class="tile green hvr-glow">
      <h2>Respiration</h2>
      <p>Cliquez pour voir la respiration de <b>{infoP}</b>.</p>
      </Link>
      </div>
      <div class="col-md-6">
      <Link to="/cardio" class="tile blue hvr-glow">
      <h2>Electrocardiogramme</h2>
      <p>Cliquez pour voir l'electrocardiogramme de <b>{infoP}</b>.</p>
      </Link>
      </div>
      </div>

      </div>

      <div class="container col-md-5">
      <div class="container border rounded bg-white">
      <h2>Vos patients</h2>
      <input type="text" class="form-control form-control-lg col-md-12 mt-3 mb-2" placeholder="Rechercher" onChange={this.fltrList.bind(this)}/>
      <div class="mt-2 mb-2">{listItems}</div>
      </div>

      </div>
      </div>

      </div>
    )
  }

  return (

    <div class="container-fluid d-inline-block mt-4">

    <div class="row">
    <div class="container col-md-7">

    </div>

    <div class="container col-md-5">
    <div class="container border rounded bg-white">
    <h2>Vos patients</h2>
    <input type="text" class="form-control form-control-lg col-md-12 mt-3 mb-2" placeholder="Rechercher" onChange={this.fltrList.bind(this)}/>
    <div class="mt-2 mb-2">{listItems}</div>
    </div>
    </div>
    </div>

    </div>
  )


}

};

export default PatientL;
