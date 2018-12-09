import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Line} from 'react-chartjs-2';
import 'whatwg-fetch';

import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';

class Temperature extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temps: [],
      max: 0,
      min: 0,
      moy: 0,
      label:[],
      consulting: '',
      fname:'',
      lname:''
    };


  }

  componentDidMount() {
    const obj = getFromStorage('6teme_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/verify?token=' + token)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            consulting: json.consulting
          });

          if(this.state.consulting){
            fetch('/api/account/getname', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                email: this.state.consulting,
              }),
            }).then(res => res.json())
            .then(json => {
              if (json.success) {
                this.setState({
                  fname: json.Fname,
                  lname: json.Lname
                });
              }
            });
          }
        }
      });
    }

    this.interval = setInterval(() =>
    fetch('/api/account/temp').then(res => res.json())
    .then(json => {
      if(json.success){
        var sum=0;
        this.state.label = [];
        for (var i=0; i<json.data.length; i++) {
          sum+=parseFloat(json.data[i]);
          this.state.label.push(i);
        }
        var avg = (sum / json.data.length);

        this.setState({
          temps: json.data,
          max: Math.max(...json.data),
          min: Math.min(...json.data),
          moy: avg,
        });
      }

    }), 1000);

  }




  render(){

    const {
      temps,
      max,
      min,
      moy,
      label,
      fname,
      lname
    } = this.state;

    const data = {
      labels: label,
      datasets: [
        {
          label: 'Votre température',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#ba79cb',
          borderColor: '#ba79cb',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#ba79cb',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'red',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: temps,
        }
      ]
    };

    return(
      <div class="container-fluid d-inline-block mt-4">
      <div class="row mt-1 bg-white">

      <div class="container col-md-7 border">
      <h2>Température {fname} {lname}</h2>
      <Line
      data={data}
      />
      </div>

      <div class="container col-md-5 border">

      <h1>Informations</h1>

      <h3>Max : {max}</h3>
      <h3>Min : {min}</h3>
      <h3>Moyenne : {moy}</h3>

      </div>

      </div>

      <div class="container-fluid d-inline-block mt-4" >


      <div class="container col-md-8">
      <div class="row">

      <div class="col-md-4">
      <Link to="/tension" class="tile orange hvr-glow">
      <h2>Tension</h2>
      <p>Cliquez pour voir votre tension.</p>
      </Link>
      </div>

      <div class="col-md-4">
      <Link to="/breathe" class="tile green hvr-glow">
      <h2>Respiration</h2>
      <p>Cliquez pour voir votre respiration.</p>
      </Link>
      </div>

      <div class="col-md-4">
      <Link to="/cardio" class="tile blue hvr-glow">
      <h2>Electrocardiogramme</h2>
      <p>Cliquez pour voir votre electrocardiogramme.</p>
      </Link>
      </div>

      </div>
      </div>

      </div>
      </div>
    )
  }

};


export default Temperature;
