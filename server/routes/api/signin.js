const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {
  /*
  * Sign up
  */
  app.post('/api/account/signup', (req, res, next) => {
    const { body } = req;
    const {
      password
    } = body;
    const {
      firstName
    } = body;
    const {
      lastName
    } = body;
    const {
      type
    } = body;
    let {
      email
    } = body;

    if (!firstName) {
      return res.send({
        success: false,
        message: 'Noubliez pas de renseigner votre prénom'
      });
    }
    if (!lastName) {
      return res.send({
        success: false,
        message: 'Noubliez pas de renseigner votre nom'
      });
    }
    if (!type) {
      return res.send({
        success: false,
        message: 'Noubliez pas de renseigner si vous êtes médecin ou patient'
      });
    }

    if (!email) {
      return res.send({
        success: false,
        message: 'Noubliez pas de renseigner votre adresse email'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Noubliez pas de renseigner votre mot de passe'
      });
    }

    email = email.toLowerCase();
    email = email.trim();
    // Steps:
    // 1. Verify email doesn't exist
    // 2. Save
    User.find({
      email: email
    }, (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: 'Error: Account already exist.'
        });
      }
      // Save the new user
      const newUser = new User();
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.type = type;
      newUser.email = email;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        return res.send({
          success: true,
          message: 'Enregistré !'
        });
      });
    });
  }); // end of sign up endpoint

  /*
  * Sign in
  */

  app.post('/api/account/signin', (req, res, next) => {
    const { body } = req;
    const {
      password
    } = body;
    let {
      email
    } = body;
    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }
    email = email.toLowerCase();
    email = email.trim();
    User.find({
      email: email
    }, (err, users) => {
      if (err) {
        console.log('err 2:', err);
        return res.send({
          success: false,
          message: 'Error: server error'
        });
      }
      if (users.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      }
      const user = users[0];
      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      }
      // Otherwise correct user
      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err, doc) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: 'Error: server error'
          });
        }
        return res.send({
          success: true,
          message: 'Valid sign in',
          token: doc._id
        });
      });
    });
  }); // end of sign in endpoint


  /*
  * Log out
  */

  app.get('/api/account/logout', (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test
    // Verify the token is one of a kind and it's not deleted.
    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
      $set: {
        isDeleted:true
      }
    }, null, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      return res.send({
        success: true,
        message: 'Good'
      });
    });
  });  // end of log out endpoint

  /*
  * Verify is logged on
  */

  app.get('/api/account/verify', (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test
    // Verify the token is one of a kind and it's not deleted.
    UserSession.find({
      _id: token,
      isDeleted: false
    }, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      } else {
        // DO ACTION
        const session = sessions[0];
        const id = session.userId;
        User.find({
          _id: id
        }, (err, users) => {
          const user = users[0];
          if (err) {
            console.log(err);
            return res.send({
              success: false,
              message: 'Error: Server error'
            });
          }
          return res.send({
            success: true,
            message: 'Good',
            Fname: user.firstName,
            Lname: user.lastName,
            Type: user.type,
            email: user.email,
            medecin: user.medecin,
            patient: user.patient,
            consulting: session.consulting
          });
        });
      }

    });
  });

  /*
  * Add medecin
  */

  app.post('/api/account/addmed', (req, res, next) => {
    const { body } = req;
    const {
      emailP
    } = body;
    let {
      email
    } = body;
    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }
    email = email.toLowerCase();
    email = email.trim();
    User.findOneAndUpdate({
      email: email,
      type: 'Medecin'
    }, {
      $push: {
        patient: emailP
      }
    }, (err, doc) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
    });
    User.findOneAndUpdate({
      email: emailP,
      type: 'Patient'
    }, {
      $set: {
        medecin: email
      }
    }, (err, doc) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      return res.send({
        success: true,
        message: 'Enregistré'
      });
    });
  }); // end of addmed endpoint

  app.post('/api/account/getname', (req, res, next) => {

    const { body } = req;
    let { email } = body;
    email = email.toLowerCase();
    email = email.trim();
    User.find({
      email: email
    }, (err, users) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      // DO ACTION
      const user = users[0];
      return res.send({
        success: true,
        Fname: user.firstName,
        Lname: user.lastName,
      });
    });

  });

  app.get('/api/account/getusers', (req, res, next) => {

    const { body } = req;
    var userList = [];
    var count = 0;
    User.find({}, (err, users) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      } else {
        var id = '';
        users.forEach(function(user){
          id=user._id;
          UserSession.find({
            userId: id
          },(err, sessions) => {
            userList.push(Array.of(user).concat(sessions));
            count++;
            if(count === users.length) {

              return res.send({
                success: true,
                Users: users,
                Sessions: userList
              });
            }
          });

        });
      }
    });
  });

  app.post('/api/account/deleteuser', (req, res, next) => {

    const { body } = req;
    let { email } = body;
    email = email.toLowerCase();
    email = email.trim();
    User.deleteOne({ email: email }, function (err) {});
    User.findOneAndUpdate({
      patient: email,
      type: 'Medecin'
    }, {
      $pull: {
        patient: email
      }
    }, function (err) {});
    User.findOneAndUpdate({
      medecin: email,
      type: 'Patient'
    }, {
      $set: {
        medecin: ''
      }
    }, function (err) {});

  });

  app.post('/api/account/consulting', (req, res, next) => {

    const { body } = req;
    const { token } = body;
    let { email } = body;
    email = email.toLowerCase();
    email = email.trim();
    UserSession.findOneAndUpdate({
      _id: token,
    }, {
      $set: {
        consulting: email
      }
    }, null, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      return res.send({
        success: true,
        message: 'Good'
      });
    });
  });

};
