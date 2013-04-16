
var CastsController = require('./controllers/casts');

module.exports = function (app) {
  
  app.get('/', CastsController.index);
  app.get('/:id', CastsController.show);
  
}
