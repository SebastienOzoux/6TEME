import React, { Component } from 'react';
import 'whatwg-fetch';

import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';

class Sign extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
      signUpFirstname:'',
      signUpLastname:'',
      signUpType:'',
      isLogged: false,
      fname: '',
      lname: '',
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onTextboxChangeSignUpFirstname = this.onTextboxChangeSignUpFirstname.bind(this);
    this.onTextboxChangeSignUpLastname = this.onTextboxChangeSignUpLastname.bind(this);
    this.onTextboxChangeSignUpType = this.onTextboxChangeSignUpType.bind(this);

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.logout = this.logout.bind(this);
    this.Logged = this.Logged.bind(this);
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
            token,
            isLoading: false,
            fname: json.Fname,
            lname: json.Lname
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

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpFirstname(event) {
    this.setState({
      signUpFirstname: event.target.value,
    });
  }

  onTextboxChangeSignUpLastname(event) {
    this.setState({
      signUpLastname: event.target.value,
    });
  }

  onTextboxChangeSignUpType(event) {
    this.setState({
      signUpType: event.target.value,
    });
  }

  Logged(){
    if(this.state.isLogged){
      this.setState({
        isLogged: false,
      });
    } else {
      this.setState({
        isLogged: true,
      });
    }

  }


  onSignUp() {
    // Grab state
    const {
      signUpEmail,
      signUpPassword,
      signUpFirstname,
      signUpLastname,
      signUpType,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signUpEmail,
        password: signUpPassword,
        firstName: signUpFirstname,
        lastName: signUpLastname,
        type: signUpType,
      }),
    }).then(res => res.json())
    .then(json => {
      console.log('json', json);
      if (json.success) {
        this.setState({
          signUpError: json.message,
          isLoading: false,
          signUpEmail: '',
          signUpPassword: '',
          signUpFirstname:'',
          signUpLastname:'',
          signUpType:'',
        });
      } else {
        this.setState({
          signUpError: json.message,
          isLoading: false,
        });
      }
    });
  }

  onSignIn() {
    // Grab state
    const {
      signInEmail,
      signInPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    }).then(res => res.json())
    .then(json => {
      console.log('json', json);
      if (json.success) {
        setInStorage('6teme_app', { token: json.token });
        window.location.reload();
        this.setState({
          signInError: json.message,
          isLoading: false,
          signInPassword: '',
          signInEmail: '',
          token: json.token,
        });
      } else {
        this.setState({
          signInError: json.message,
          isLoading: false,
        });
      }
    });
  }

  logout() {
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage('6teme_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/logout?token=' + token)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          window.location.reload();
          this.setState({
            token: '',
            isLoading: false
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

  render() {
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
      signUpEmail,
      signUpPassword,
      signUpFirstname,
      signUpLastname,
      signUpType,
      signUpError,
      isLogged,
      fname,
      lname,
    } = this.state;

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

    if (!token) {
      if(!isLogged){
        return (
          <div class="container-fluid d-inline-block mt-4" >
          <div>
          {
            (signInError) ? (
              <p>{signInError}</p>
            ) : (null)
          }
          <form class="border rounded col-md-6 bg-white mb-4">
          <div class="form-group mt-3 mb-4">
          <h3>Connexion</h3>

          <input
          type="email"
          placeholder="Email"
          class="form-control form-control-lg col-md-6"
          value={signInEmail}
          onChange={this.onTextboxChangeSignInEmail}
          /><br />
          <input
          type="password"
          placeholder="Password"
          class="form-control form-control-lg col-md-6"
          value={signInPassword}
          onChange={this.onTextboxChangeSignInPassword}
          /><br />
          <button type="submit" class="btn btn-lg btn-success" onClick={this.onSignIn}>Se connecter</button>
          </div>
          </form>
          <div> Pas encore enregistré ?</div>
          <button type="submit" class="btn btn-lg btn-info" onClick={this.Logged}>Se créer un compte</button>
          </div>
          </div>
        );
      }
      return(
        <div class="container-fluid d-inline-block mt-4" >
        <div>
        {
          (signUpError) ? (
            <p>{signUpError}</p>
          ) : (null)
        }
        <form class="border rounded">
        <div class="form-group">
        <h3>Inscription</h3>

        <div class="row justify-content-md-center">
        <div class="col-md-2">
        <input
        type="text"
        placeholder="Prénom"
        class="form-control form-control-lg"
        value={signUpFirstname}
        onChange={this.onTextboxChangeSignUpFirstname}
        />
        </div>
        <div class="col-md-2">
        <input
        type="text"
        placeholder="Nom"
        class="form-control form-control-lg"
        value={signUpLastname}
        onChange={this.onTextboxChangeSignUpLastname}
        />
        </div>
        <div class="col-md-1">
        <select value={signUpType} onChange={this.onTextboxChangeSignUpType} class="form-control form-control-lg">
        <option hidden defaultValue> Type </option>
        <option value="Medecin">Médecin</option>
        <option value="Patient">Patient</option>
        </select>
        </div>
        </div>
        <br />

        <input
        type="email"
        placeholder="Email"
        class="form-control form-control-lg col-md-3"
        value={signUpEmail}
        onChange={this.onTextboxChangeSignUpEmail}
        /><br />
        <input
        type="password"
        placeholder="Password"
        class="form-control form-control-lg col-md-3"
        value={signUpPassword}
        onChange={this.onTextboxChangeSignUpPassword}
        /><br />

        <button type="submit" class="btn btn-lg btn-success" onClick={this.onSignUp}>S'enregistrer</button>
        </div>
        <br/>
        <br/>
        </form>
        <div>Déjà enregistré ?</div>
        <button type="submit" class="btn btn-lg btn-info" onClick={this.Logged}>Se connecter</button>
        <br/>
        <br/>
        </div>
        </div>
      );
    }

    return (
      <div class="container-fluid d-inline-block mt-4" >
      <h3> Vous êtes connecté(e), {fname} {lname} !</h3>
      <div>Cliquez ici pour fermer votre session</div>
      <br />
      <button type="submit" class="btn btn-lg btn-danger" onClick={this.logout}>Se déconnecter</button>
      </div>
    );
  }
}

export default Sign;
