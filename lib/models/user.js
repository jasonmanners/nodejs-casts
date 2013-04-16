var User = function(){
  var mongoose  = require('mongoose'),
      Schema    = mongoose.Schema,
      validate  = require('mongoose-validator').validate,
      crypto    = require('crypto');

  var userSchema = new Schema({
    name    : {type: String, validate: validate({message: 'Name cannot be blank'},'notEmpty')},
    email   : {type: String, validate: validate({message: 'Email cannot be blank'},'notEmpty')},
    salt    : String,
    hashed_password : {type: String, validate: validate({message: 'Password cannot be blank'},'notEmpty')},
    username : String,
    provider : String,
    facebook : {},
    twitter : {},
    github : {}
  });

  // Define Methods to be used on the model
  var _authenticate = function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  }

  var _encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
  }

  var _makeSalt = function() {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  }


  // Assign Model methods
  userSchema.method('makeSalt', _makeSalt);
  userSchema.method('encryptPassword', _encryptPassword);
  userSchema.method('authenticate', _authenticate);


  // Virtual Attributes
  userSchema
    .virtual('password')
    .set(function(password){
      this._password = password;
      if(password !== '') {
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);  
      }
      else {
        this.hashed_password = ''; 
      }
      
    })
    .get(function(){
      return this._password;
    });

  var _model = mongoose.model('User',userSchema);

  var _callbackHandler = function(callback, err, docs) {
    callback(err,docs);
  };

  var _new = function(doc) {
    return new _model(doc);
  };

  var _create = function(doc, cb) {
    var newUser = new _model(doc);
    newUser.save(_callbackHandler.bind(null,cb));
  };

  var _findByEmail = function(email,success) {
    _model.findOne({email:email},_callbackHandler.bind(null,success));
  };

  var _findById = function(id, success) {
    _model.findById(id,_callbackHandler.bind(null,success));
  }


  // Public Interface
  return {
    model   : _model,
    new     : _new,
    create  : _create,
    findByEmail : _findByEmail,
    findById    : _findById
  };

}();
module.exports = User;