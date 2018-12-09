import React, { Component } from 'react';
import 'whatwg-fetch';

import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';

class AddMed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      medecin: false,
      email: '',
      msg: '',
      emailP: '',
      emailM: '',
      isLoading: true,
      change: false,
      fname: '',
      lname: ''
    };

    this.onTextboxChangeEmail = this.onTextboxChangeEmail.bind(this);
    this.addMedecin = this.addMedecin.bind(this);
    this.Change = this.Change.bind(this);

  }

  onTextboxChangeEmail(event){
    this.setState({
      email: event.target.value,
    });
  }

  componentDidMount() {
    const obj = getFromStorage('6teme_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/verify?token=' + token)
      .then(res => res.json())
      .then(json => {
        console.log('Médecin', json.medecin);
        if (json.success&&!json.medecin) {
          console.log('Pas de médecin');
          this.setState({
            emailP: json.email,
            medecin: false,
            isLoading: false
          });
        }
        if(json.success&&json.medecin){
          this.setState({
            emailM: json.medecin,
            medecin: true,
            isLoading: false,
          });

          fetch('/api/account/getname', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: this.state.emailM,
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
      });
    }

  }

  addMedecin(){
    // Grab state
    const {
      email,
      emailP,
      fname,
      lname
    } = this.state;

    this.setState({
      isLoading: true,
    });

    fetch('/api/account/getname', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
      }),
    }).then(res => res.json())
    .then(json => {
      if (json.success) {
        this.setState({
          fname: json.Fname,
          lname: json.Lname
        });
        if (confirm("Voulez vous choisir le docteur " + this.state.fname + " " + this.state.lname + " comme médecin traitant ?" )) {

          fetch('/api/account/addmed', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email,
              emailP: emailP
            }),
          }).then(res => res.json())
          .then(json => {
            console.log('json', json);
            if (json.success) {
              window.location.reload();
              this.setState({
                msg: json.message,
                medecin: true,
                isLoading: false
              });
            } else {
              window.location.reload();
              this.setState({
                msg: json.message,
                isLoading: false
              });
            }
          });

        } else {
          this.setState({
            isLoading: false,
          });
        }
      }
    });


  }

  Change(){
    if(this.state.change){
      this.setState({
        change: false,
      });
    } else {
      this.setState({
        change: true,
      });
    }

  }


  render(){
    const {
      medecin,
      email,
      msg,
      emailM,
      isLoading,
      change,
      fname,
      lname
    } = this.state;

    if (isLoading) {
      return (
        <div class="container">
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

    if (!medecin){
      return(
        <div class="container-fluid d-inline-block mt-4">
        <h5>Vous n'avez pas de médecin attribué !</h5>
        <br />
        <form class="border rounded">
        <div class="form-group">
        <br />
        <h3>Ajouter un médecin traitant</h3>
        <br />
        <div>Merci de renseigner l'adresse email de votre médecin traitant :</div>
        <br />
        <div class="justify-content-md-center">
        <div class="col-md-4">
        <input
        type="email"
        placeholder="ex: michel.martin@societe.fr"
        class="form-control form-control-lg"
        onChange={this.onTextboxChangeEmail}
        />
        </div>
        </div>
        <br />
        </div>
        <button type="submit" class="btn btn-lg btn-success" onClick={this.addMedecin}>Définir ce médecin comme médecin traitant</button>
        <br/>
        <br/>
        </form>
        <div>{msg}</div>
        </div>
      )
    }

    if(!change){
      return(
        <div class="container-fluid d-inline-block mt-4">
        <h3>Votre médecin est : {fname} {lname}</h3><p> ({emailM})</p>
        <br/>
        <br/>
        <button type="submit" class="btn btn-lg btn-info" onClick={this.Change}>Cliquez ici pour changer de médecin</button>
        </div>
      )
    }

    return(
      <div class="container-fluid d-inline-block mt-4">
      <form class="border rounded col-md-8 bg-white">
      <div class="form-group">
      <br />
      <h3>Changer de médecin traitant</h3>
      <br />
      <div>Merci de renseigner l'adresse email de votre nouveau médecin traitant :</div>
      <br />
      <div class="justify-content-md-center">
      <div class="col-md-4">
      <input
      type="email"
      placeholder="ex: michel.martin@societe.fr"
      class="form-control form-control-lg"
      onChange={this.onTextboxChangeEmail}
      />
      </div>
      </div>
      <br />
      </div>
      <button type="submit" class="btn btn-lg btn-success" onClick={this.addMedecin}>Définir ce médecin comme nouveau médecin traitant</button>
      <br/>
      <br/>
      <button type="submit" class="btn btn-lg btn-info" onClick={this.Change}>Retour</button>
      <br/>
      <br/>
      </form>
      <div>{msg}</div>
      </div>
    )
  }

};

export default AddMed;
