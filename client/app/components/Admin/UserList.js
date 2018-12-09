import React, { Component } from 'react';


class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      search: '',
      filterlist: [],
      infos: [],
      sessions: [],
      timeinfos: [],
      connected: false
    };


    this.displayInfos = this.displayInfos.bind(this);
    this.delete = this.delete.bind(this);

  }

  componentDidMount(){
    fetch('/api/account/getusers')
    .then(res => res.json())
    .then(json => {
      if (json.success) {
        this.setState({
          users: json.Users,
          sessions: json.Sessions
        });
        console.log(this.state.sessions[0]);
        console.log(this.state.users);
      }
    });
  }

  fltrList(event) {
    this.setState({
      search: event.target.value
    });
  }

  displayInfos(e){
    var timestamp = [];
    var online= false;
    for(var i=0;i<this.state.sessions.length;i++){
        if(this.state.sessions[i][0]._id===this.state.users[e.target.value]._id){
          for(var j=1;j<this.state.sessions[i].length;j++){
            timestamp.push(this.state.sessions[i][j].timestamp)
          }
          if(this.state.sessions[i][this.state.sessions[i].length-1].timestamp){
            online=!this.state.sessions[i][this.state.sessions[i].length-1].isDeleted;
          } else{
            online=false;
          }

        }
    }
    this.setState({
      infos: [this.state.users[e.target.value]],
      timeinfos: timestamp,
      connected: online
    });

  }

  delete(d){

    fetch('/api/account/deleteuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: d.target.value
      }),
    });
    window.location.reload();
  }

  render(){

    const {
      users,
      search,
      timeinfos,
      connected
    } = this.state;

    let {
      filterList,
      infos
    } = this.state;

    filterList = users.filter((name) =>
    (name.firstName + name.lastName + name.email + name.type).toLowerCase().indexOf(search.toLowerCase()) > -1
  );

  let list = filterList.map((item, key) =>
  <label class="container-r border rounded hvr-grow hvr-glow col-md-10 mb-2">{item.firstName} {item.lastName}
  <input type="radio" name="users" value={key} onChange={this.displayInfos}/>
  </label>
);

let infoList = infos.map((info) =>
  <div>
  <h3>{info.firstName} {info.lastName}</h3>
  <h5>Adresse email : {info.email}</h5>
  <h5>Type : {info.type}</h5>
  <h5>Date d'inscription : {new Date(info.signUpDate).toLocaleString()}</h5>
  <h5>Nombre de connexions : {timeinfos.length}</h5>
  <h5>Dernière connexion : {new Date(timeinfos[timeinfos.length-1]).toLocaleString()}</h5>
  <h5>Connecté : {connected.toString()}</h5>
  <br/>
  <button class="btn btn-lg btn-danger" value={info.email} onClick={this.delete}><span class="glyphicon glyphicon-trash"></span>Supprimer</button>
  </div>


);


return(
  <div class="container-fluid d-inline-block mt-4">

  <div class="container col-md-10 border rounded bg-white">

  <div class="row mt-4">

  <div class="container col-md-4 mb-2 border-right">
  <h2 class="mb-4 mt-2">Liste des utilisateurs</h2>
  <input type="text" class="form-control form-control-lg col-md-11 mt-1 mb-4" placeholder="Rechercher" onChange={this.fltrList.bind(this)}/>
  <div>{list}</div>
  <h5>Nombre d'utilisateurs total : {users.length}</h5>
  </div>

  <div class="container col-md-6 mb-2">
  <h2 class="mb-4 mt-2">Informations</h2>
  <div>{infoList}</div>
  </div>

  </div>

  </div>
  </div>
)
}

};


export default UserList;
