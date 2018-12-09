import React, { Component } from 'react';


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };


  }

  render(){

    return(
      <div>
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
      <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
      <div class="carousel-item active">
      <img class="d-block w-100" src="/assets/img/test.png" />
      <div class="carousel-caption d-none d-md-block">
      <h1>6TEME</h1>
      <h5>Bienvenue</h5>
      </div>
      </div>
      <div class="carousel-item">
      <img class="d-block w-100" src="/assets/img/home.png"/>
      <div class="carousel-caption d-none d-md-block">
      <h1>Inscrivez vous</h1>
      <h5>En tant que patient ou médecin</h5>
      </div>
      </div>
      <div class="carousel-item">
      <img class="d-block w-100" src="/assets/img/home.png"/>
      <div class="carousel-caption d-none d-md-block">
      <h1>Votre santé en temps réel</h1>
      <h5>Consultez et analysez vos données de santé</h5>
      </div>
      </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Précédent</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Suivant</span>
      </a>
      </div>
      </div>
    )
  }

};


export default Home;
