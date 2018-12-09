import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Line} from 'react-chartjs-2';


class Tension extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };


  }




  render(){

    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Votre température',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#f56954',
          borderColor: '#f56954',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#f56954',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'red',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };

    return(
      <div class="container-fluid d-inline-block mt-4">
      <div class="row mt-1 bg-white">

      <div class="container col-md-7">
      <h2>Tension</h2>
      <Line data={data}
      />
      </div>

      <div class="container col-md-5 border">

      <h1>Informations</h1>


      <div class="form-group">
      <label class="col-md-4 control-label" for="radios">Multiple Radios</label>
      <div class="col-md-4">
      <div class="radio">
      <label for="radios-0">
      <input type="radio" name="radios" id="radios-0" value="1" checked="checked" />
      Option one
      </label>
      </div>
      <div class="radio">
      <label for="radios-1">
      <input type="radio" name="radios" id="radios-1" value="2" />
      Option two
      </label>
      </div>
      </div>
      </div>


      <div class="form-group">
      <label class="col-md-4 control-label" for="singlebutton">Single Button</label>
      <div class="col-md-4">
      <button id="singlebutton" name="singlebutton" class="btn btn-primary">Button</button>
      </div>
      </div>

      </div>

      </div>

      <div class="container-fluid d-inline-block mt-4" >


      <div class="container col-md-8">
      <div class="row">

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

      <div class="col-md-4">
      <Link to="/temperature" class="tile purple hvr-glow">
      <h2>Température</h2>
      <p>Cliquez pour voir votre tension.</p>
      </Link>
      </div>


      </div>
      </div>

      </div>
      </div>
    )
  }

};


export default Tension;
