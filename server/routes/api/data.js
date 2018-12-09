const Temperature = require('../../models/Temperature');

module.exports = (app) => {


  app.get('/api/account/temp', (req, res, next) => {
    Temperature.find({}, (err, temps) => {
      if (err) {
        console.log(err);
      }

      const allTemp= [];

      temps.forEach(function(temp) {
        allTemp.push(temp.temperature);
      });
      return res.send({
        success: true,
        data: allTemp
      });

    });

  });

};
