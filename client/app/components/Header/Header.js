import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';


class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      fName:'',
      lName:'',
      email:'',
      type:'',
      Initials: '',
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
          var name = json.Fname + ' ' + json.Lname;
          var initials = name.match(/\b\w/g) || [];
          initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
          this.setState({
            token,
            Initials: initials,
            isLoading: false,
            fName: json.Fname,
            lName: json.Lname,
            type: json.Type,
          });
        } else {
          this.setState({
            isLoading: false,
          });
        }
      });
    } else {
      this.setState({
        isLoading: false,
      });
    }

  }


  render(){

    const {
      isLoading,
      token,
      fName,
      lName,
      type,
      Initials,
    } = this.state;

    if (isLoading) {
      return (
        <div id="circleG">
        <div id="circleG_1" class="circleG"></div>
        <div id="circleG_2" class="circleG"></div>
        <div id="circleG_3" class="circleG"></div>
        </div>
      );
    }

    if (!token) {

      return(

        <header>

        <nav class="navbar fixed-top navbar-expand-lg navbar-dark">
        <Link to="/" class="navbar-brand">6TEME</Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
        <Link to="/" class="nav-link">Accueil
        <span class="sr-only">(current)</span>
        </Link>
        </li>
        <li class="nav-item">
        <Link to="/sign" class="nav-link">Se connecter / S'enregistrer</Link>
        </li>
        </ul>
        </div>
        </nav>

        </header>

      )
    } else {

      if (type=='Admin'){
        return(
          <header>

          <nav class="navbar fixed-top navbar-expand-lg navbar-dark">
          <Link to="/" class="navbar-brand">6TEME</Link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText"
          aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
          <Link to="/userlist" class="nav-link">Liste des utilisateurs</Link>
          </li>
          <li class="nav-item active">
          <Link to="/sign" class="nav-link">Se déconnecter</Link>
          </li>
          </ul>
          <span class="navbar-text white-text" data-letters={Initials}>
          Bonjour {fName} {lName} ! (Administrateur)
          </span>
          </div>
          </nav>

          </header>
        )
      }

      if (type=='Medecin'){
        return(

          <header>

          <nav class="navbar fixed-top navbar-expand-lg navbar-dark">
          <Link to="/" class="navbar-brand">6TEME</Link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText"
          aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
          <Link to="/homem" class="nav-link">Accueil
          <span class="sr-only">(current)</span>
          </Link>
          </li>
          <li class="nav-item active">
          <Link to="/patientl" class="nav-link">Mes patients</Link>
          </li>
          <li class="nav-item active">
          <Link to="/sign" class="nav-link">Se déconnecter</Link>
          </li>
          </ul>
          <span class="navbar-text white-text" data-letters={Initials}>
          Bonjour Dr. {fName} {lName} !
          </span>
          </div>
          </nav>

          </header>
        )
      }

      if (type=='Patient'){
        return(

          <header>

          <nav class="navbar fixed-top navbar-expand-lg navbar-dark">
          <Link to="/" class="navbar-brand">6TEME</Link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText"
          aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
          <Link to="/homep" class="nav-link">Accueil
          <span class="sr-only">(current)</span>
          </Link>
          </li>
          <li class="nav-item active">
          <Link to="/addmed" class="nav-link">Mon Médecin</Link>
          </li>
          <li class="nav-item active">
          <Link to="/sign" class="nav-link">Se déconnecter</Link>
          </li>
          </ul>
          <span class="navbar-text white-text" data-letters={Initials}>
          Bonjour {fName} {lName} !
          </span>
          </div>
          </nav>

          </header>
        )
      }

    }

  }

};

export default Header;
