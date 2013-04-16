var Cast = require("../../models/cast")

module.exports = {
  
  index : function(req,res) {
    Cast.all(function(err,casts) {
      res.render('casts/index', {
        casts: casts
      });
    });
  },

  show : function(req,res) {
    Cast.findById(req.params.id, function(err,cast) {
      var summary = cast.summary;
      var readme = cast.readme;

      res.render('casts/show', {
        cast: cast,
        summary : summary,
        ascii_cast : readme
      })
    })
  }

};