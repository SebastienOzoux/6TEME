import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class HomeM extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temps: [],
      max: '',
      min: '',
      maxTemp: false,
      minTemp: false
    };


  }

  componentDidMount() {
    fetch('/api/account/temp').then(res => res.json())
    .then(json => {
      if(json.success){
        this.setState({
          temps: json.data,
          max: Math.max(...json.data),
          min: Math.min(...json.data),
        });
      }
      if (this.state.max>=38){
        this.setState({
          maxTemp: true
        });
      }
      if (this.state.min<=36){
        this.setState({
          minTemp: true
        });
      }
    });

  }

  render(){
    const{
      maxTemp,
      minTemp,
      min,
      max
    } = this.state;


    return(
      <div class="container-fluid d-inline-block mt-4">
      <div class="row">
      <div class="container col-md-7">
      <div class="container border rounded mb-4 bg-white">
      <h2>Informations générales</h2>
      {
        !maxTemp ? null :
        (
          <h5 class="text-danger">Votre patient Paul Dumont a atteint la température de {max}°C</h5>
        )
      }
      {
        !minTemp ? null :
        (
          <h5 class="text-danger">Votre patient Paul Dumont a atteint la température de {min}°C</h5>
        )
      }
      {
        maxTemp||minTemp ? null :
        (
          <h5 class="text-success">Rien à signaler !</h5>
        )
      }
      </div>
      </div>

      <div class="container col-md-5">
      <div class="container mb-4">
      <h2>Messages</h2>
      <p>Vous avez 1 nouveau message</p>
      </div>
      </div>
      </div>
      </div>
    )
  }

};

export default HomeM;
