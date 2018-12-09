import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class HomeP extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };


  }

  render(){

    return(
      <div class="container-fluid d-inline-block mt-4" >

      <div class="row">
      <div class="container col-md-7">

      <div class="row">
      <div class="col-md-6">
      <Link to="/temperature" class="tile purple hvr-glow">
      <h2>Température</h2>
      <p>Cliquez pour voir votre température.</p>
      </Link>
      </div>
      <div class="col-md-6">
      <Link to="/tension" class="tile orange hvr-glow">
      <h2>Tension</h2>
      <p>Cliquez pour voir votre tension.</p>
      </Link>
      </div>
      </div>

      <div class="row">
      <div class="col-md-6">
      <Link to="/breathe" class="tile green hvr-glow">
      <h2>Respiration</h2>
      <p>Cliquez pour voir votre respiration.</p>
      </Link>
      </div>
      <div class="col-md-6">
      <Link to="/cardio" class="tile blue hvr-glow">
      <h2>Electrocardiogramme</h2>
      <p>Cliquez pour voir votre electrocardiogramme.</p>
      </Link>
      </div>
      </div>

      </div>

      <div class="container col-md-5 border-left">
      <div class="container border rounded mb-4 bg-white">
      <h2>Messages</h2>
      <p>Vous avez 1 nouveau message</p>
      </div>
      <div class="container border rounded mt-4 bg-white">
      <h2>Informations générales</h2>
      <p>Votre température actuelle est de 37.52°C</p>
      <p class="text-success">Vous êtes en bonne santé !</p>
      </div>
      </div>
      </div>

      </div>
    )
  }

};


export default HomeP;
