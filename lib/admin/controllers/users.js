var User = require("../../models/user")

module.exports = {

  login : function(req,res) {
    res.render('users/login', {
      title: 'Login'
    });
  },

  logout : function(req,res) {
    req.logout();
    res.redirect('/admin/login');
  },

  session : function (req, res) {
    res.redirect('/')
  }

};