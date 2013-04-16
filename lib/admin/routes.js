
var User = require("../models/user"),
    UsersController = require("./controllers/users"),
    CastsController = require("./controllers/casts");

module.exports = function (app, passport) {
  var adminPre = "/admin";
  
  // Admin User Routes
  app.get(adminPre, function(req,res) {
    res.redirect(adminPre+'/login');
  })
  app.get(adminPre+"/login",  UsersController.login);
  app.get(adminPre+"/logout", UsersController.logout);

  app.post(adminPre+"/users/session", passport.authenticate('local', {failureRedirect: adminPre+'/login'}), UsersController.session);
  
  // // Admin Cast Routes
  // app.get(adminPre+'/casts/new', auth.requiresLogin, casts.new)
  // app.post(adminPre+'/casts',    auth.requiresLogin, casts.create)


  //Old
  //app.get('/casts/:id/edit', auth.requiresLogin, auth.cast.hasAuthorization, casts.edit)
  //app.put('/casts/:id', auth.requiresLogin, auth.cast.hasAuthorization, casts.update)
  //app.del('/casts/:id', auth.requiresLogin, auth.cast.hasAuthorization, casts.destroy)

  // Set User Param
  var _setUserParam = function(req,next,err,user) {
    if(err) return next(err);

    if(!user) return next(new Error('Failed to load User '+ id));

    req.profile = user;
    next();
  };

  app.param('userId', function (req, res, next, id) {
    User.findById(id, _setUserParam.bind(null,req,next));
  });
}
