var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema,
    validate  = require('mongoose-validator').validate;

module.exports = {
  database  : mongoose,
  schema    : Schema,
  validate  : validate,

  connect   : function(url) {
    this.database.connect(url);
  },

  closeConnection : function() {
    this.database.connection.close();
  }
}
